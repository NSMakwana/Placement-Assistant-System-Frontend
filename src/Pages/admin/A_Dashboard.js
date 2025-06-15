import React, { useState, useEffect } from "react";
import StudentService from "../../Services/StudentServices"; 
import StudentTable from "../../Components/admin/StudentTable";
import Filters from "../../Components/admin/Filters";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; 
import StudentDetails from "../../Components/admin/StudentDetails";
import "./A_Dashboard.css";
import axios from "axios"; // Import axios for file upload
import * as XLSX from "xlsx"; // Import xlsx

const A_Dashboard = () => {  // Receive selectedMenu as a prop
  const [studentOption, setStudentOption] = useState(); // Default to "ViewDetails"
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track the selected student
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [sscPercentage, setSSCPercentage] = useState("");
  const [hscPercentage, setHSCPercentage] = useState("");
  const [bachelorPercentage, setBachelorPercentage] = useState("");
  const [drops, setDrops] = useState(""); 
  const [file, setFile] = useState(null); // State for file upload
  const [loading, setLoading] = useState(false); // State to handle loading
  const [studentFile, setStudentFile] = useState(null);
const [uploadBatch, setUploadBatch] = useState(""); // Batch input

 

  // Fetching student data from the API 
  useEffect(() => {
    StudentService.getStudents()
      .then((response) => {
        setStudents(response.data);
        //setFilteredStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);



  // Filtering students based on selected criteria
 useEffect(() => {
    if (selectedBatch && selectedProgram) {
      let filtered = students.filter(
        (s) => s.batch === selectedBatch && s.course === selectedProgram
      );

      if (sscPercentage) {
        filtered = filtered.filter(
          (s) => s.ssc.percentage <= parseInt(sscPercentage)
        );
      }

      if (hscPercentage) {
        filtered = filtered.filter(
          (s) => s.hsc.percentage <= parseInt(hscPercentage)
        );
      }

      if (bachelorPercentage) {
        filtered = filtered.filter(
          (s) => s.bachelor.percentage <= parseInt(bachelorPercentage)
        );
      }

      if (drops) {
        filtered = filtered.filter((s) => s.drops === parseInt(drops));
      }

      setFilteredStudents(filtered);
    } else {
      
      setFilteredStudents([]);
    }
  }, [
    selectedBatch,
    selectedProgram,
    sscPercentage,
    hscPercentage,
    bachelorPercentage,
    drops,
    students
  ]);
  // Handling button click to select options
  const handleOptionClick = (option) => {
    setStudentOption(option); // Set the currently selected option
    setSelectedStudent(null); // Reset selected student when changing options
  }; 

  // Handling filter logic
  const handleFilter = (key, value) => {
    let filtered = [...students]; 

    if (key === "clear") {
      filtered=[];
      setSelectedBatch("");
      setSelectedProgram("");
      setSSCPercentage("");
      setHSCPercentage("");
      setBachelorPercentage("");
      setDrops("");
      setFilteredStudents(filtered);
      console.log(filtered);
      return;
    }
   

    // Apply each filter condition progressively (AND logic)
    if (key === "batch" && value)setSelectedBatch(value);
    if (key === "program" && value) setSelectedProgram(value);
    if (key === "sscPercentage") setSSCPercentage(value);
    if (key === "hscPercentage") setHSCPercentage(value);
    if (key === "bachelorPercentage") setBachelorPercentage(value);
    if (key === "drops") setDrops(value);

    if (key === "search" && value) {
      filtered = filtered.filter((s) =>s.name.toLowerCase().includes(value.toLowerCase()) // Filter by name
      );
      setFilteredStudents(filtered);
      console.log(filtered);
      return; 
    }
   
  };

  //delete student
  const onDelete = (eno) => {
    const updatedStudents = students.filter((student) => student.eno !== eno);
    setStudents(updatedStudents); // Update the state to remove the student
    // ssetFilteredStudents(updatedStudents); // Update the filtered list as well
  };

  //downloding filter data
  const downloadFilteredCSV = () => {
     const headers = [
      "Sr. No",
      "Name",
      "Batch",
      "Program",
      "Email",
      "Phone Number",
      "Date of Birth",
      "Gender",
      "Nationality",
      "SSC Marks",
      "SSC Total Marks",
      "SSC Percentage",
      "HSC Marks",
      "HSC Total Marks",
      "HSC Percentage",
      "Bachelor Marks",
      "Bachelor Total Marks",
      "Bachelor Percentage",
      "Master Marks",
      "Master Total Marks",
      "Master Percentage",
      "Address Block Number",
      "Address Building Name",
      "Address Area",
      "Address Landmark",
      "Address Pincode",
      "Address City",
      "Address State",
      "Drops",
      "Remarks",
    ];
  
    // Format filtered student data as CSV rows
    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.name,
      student.batch,
      student.course,
      student.email,
      student.phno,
      student.dob,
      student.gender,
      student.nationality,
      student.ssc.marks,
      student.ssc.totalMarks,
      student.ssc.percentage,
      student.hsc.marks,
      student.hsc.totalMarks,
      student.hsc.percentage,
      student.bachelor.marks,
      student.bachelor.totalMarks,
      student.bachelor.percentage,
      student.master.marks,
      student.master.totalMarks,
      student.master.percentage,
      student.address.blockNum,
      student.address.buildingName,
      student.address.area,
      student.address.landmark,
      student.address.pincode,
      student.address.city,
      student.address.state,
      student.drops,
      student.remarks,
    ]);
  
    // Combine headers and rows
    const csvContent = [
      headers.join(","), // Join headers with commas
      ...rows.map((row) => row.join(",")) // Join each row with commas
    ].join("\n"); // Join all rows with a newline
  
    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    // Create a link to trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "filtered_students_details.csv"); // Default file name for download
    link.click(); // Trigger the download
  };
  
  const downloadFilteredPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Filtered Student Details", 10, 10);

    // Define table headers
    const headers = [
      "Sr. No",
      "Name",
      "Batch",
      "Program",
      "Email",
      "Phone",
      "SSC %",
      "HSC %",
      "Bachelor %",
    ];

    // Define table rows
    const rows = filteredStudents.map((student, index) => [
      index + 1,
      student.name,
      student.batch,
      student.course,
      student.email,
      student.phno,
      student.ssc.percentage,
      student.hsc.percentage,
      student.bachelor.percentage,
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20, // Start below the title
    });

    // Save the PDF
    doc.save("filtered_students_details.pdf");
  };

  

  // Handling student selection for details view
  const handleViewStudent = (student) => {
    setSelectedStudent(student); // Set the selected student
  };

  
  // Handle file upload to backend 
const handleStudentFileChange = (e) => {
  setStudentFile(e.target.files[0]);
};

const handleStudentUpload = async () => {
  if (!studentFile) return alert("Please select a file.");
  if (!uploadBatch) return alert("Please enter the batch.");

  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);

    // Expected fields in Excel: name, eno, email
    const students = json.map((s) => {
      const name = s.name?.toLowerCase() || "";
      const password = name.slice(0, 4) + "_" + uploadBatch;
      return {
        name: s.name,
        eno: s.eno,
        email: s.email,
        password,
        role: "student",
      };
    });

    try {
      const response = await axios.post(
        "https://placement-assistant-system.onrender.com/api/user/upload_user",
        students
      );
      if (response.status === 200) {
        alert("Student accounts created successfully.");
        setStudentFile(null);
        setUploadBatch("");
      } else {
        alert("Failed to create student accounts.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred during upload.");
    }
  };

  reader.readAsArrayBuffer(studentFile);
};
  // Render content based on studentOption
  const renderStudentContent = () => {
    if (studentOption === "EnterDetails") {
      return <div className="enterdetails"> 
       <form className="class-form" onSubmit={(e) => e.preventDefault()}>
      {/* File Upload Section */}
      <div className="file-upload">
        <input
          type="text"
          placeholder="Enter Batch (e.g., 2025)"
          value={uploadBatch}
          onChange={(e) => setUploadBatch(e.target.value)}
          disabled={loading}
        />
        <input
          type="file"
           accept=".csv, .xlsx"
          onChange={handleStudentFileChange}
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleStudentUpload}
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Uploading...' : 'Upload & Extract Data'}
        </button>
      </div>
      </form></div>;
    }

    if (studentOption === "ViewDetails") {
      if (selectedStudent) {
        return (
          <div className="viewdetails">
            <button
              className="back-btn"
              onClick={() => setSelectedStudent(null)} // Go back to table
            >
              <img src="/Images/Back.png" height="25px" width="25px" />
            </button>
            <StudentDetails student={selectedStudent} />
          </div>
        );
      } else {
        return (
          <div className="viewdetails">
            <Filters onFilter={handleFilter} downloadCSV={downloadFilteredCSV} downloadPDF={ downloadFilteredPDF} />
            <StudentTable
              students={filteredStudents}
              onView={handleViewStudent} // Trigger view for selected student
              onDelete={onDelete}
            />
          </div>
        );
      }
    }

    if (studentOption === "DownloadReports") {
      return <div></div>;
    }

    return null;
  };

  // Main rendering logic
  const rendersContent = () => {
  
      return (
        <>
      
          {/* Navigation Buttons for Student Options */}
            {/* Breadcrumb */}
        
          <div className="buttons">
          <div className="breadcrumb">
          Dashboard &gt; Student
        </div>
            <button onClick={() => handleOptionClick("EnterDetails")}>
              <img src="/Images/Side errow.png" height="15px" width="15px" /> Enter Details
            </button>
            <button onClick={() => handleOptionClick("DownloadReports")}>
              <img src="/Images/Side errow.png" height="15px" width="15px" /> Download Reports
              <img src="/Images/download.png" height="18px" width="27px" />
            </button>
            <br />
            <button onClick={() => handleOptionClick("ViewDetails")}>
              <img src="/Images/Side errow.png" height="15px" width="15px" /> View Details
            </button>
          </div>

        

          {/* Render student-specific content */}
          <div className="main-section">{renderStudentContent()}</div>
        </>
      );
    }
  
    
  

  return <div className="dashboard">{rendersContent()}</div>;
  };

export default A_Dashboard;
 