import React, { useState, useEffect } from "react";
import UserServices from "../../Services/UserServices"; 

import UserFilters from "../../Components/admin/UserFilters";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; 
import StudentDetails from "../../Components/admin/StudentDetails";
import "./U_Dashboard.css";
import axios from "axios"; // Import axios for file upload
import * as XLSX from "xlsx"; // Import xlsx
import UserTable from "../../Components/admin/UserTable";

const U_Dashboard = () => {  // Receive selectedMenu as a prop
  const [studentOption, setStudentOption] = useState(); // Default to "ViewDetails"
  const [students, setStudents] = useState([]);
  const [filteredusers, setfilteredusers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track the selected student
  const [loading, setLoading] = useState(false); // State to handle loading
  const [studentFile, setStudentFile] = useState(null);
const [uploadBatch, setUploadBatch] = useState(""); // Batch input

 

  // Fetching student data from the API 
  useEffect(() => {
    UserServices.getusers()
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
        setfilteredusers(response.data); // Initialize filtered users with all students
        //setfilteredusers(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);



  // Filtering students based on selected criteria
   // Handling button click to select options
  const handleOptionClick = (option) => {
    setStudentOption(option); // Set the currently selected option
    setSelectedStudent(null); // Reset selected student when changing options
  }; 

  // Handling filter logic
  const handleFilter = (key, value) => {
    let filtered = [...students]; 

    if (key === "clear") {
      
    //window.alert("Filters cleared");
      setfilteredusers(students);
      console.log(filtered);
      return;
    }
   

    // Apply each filter condition progressively (AND logic)
    
    if (key === "search" && value) {
      filtered = filtered.filter((s) =>s.name.toLowerCase().includes(value.toLowerCase()) // Filter by name
      );
      setfilteredusers(filtered);
      console.log(filtered);
      return; 
    }
   
  };

  //delete student
  const onDelete = (eno) => {
    const updatedStudents = students.filter((student) => student.eno !== eno);
    setStudents(updatedStudents); // Update the state to remove the student
    // ssetfilteredusers(updatedStudents); // Update the filtered list as well
  };

  const downloadFilteredCSV = () => {
  const headers = ["Sr. No", "Name", "Email", "Password", "Role"];

  const rows = filteredusers.map((user, index) => [
    index + 1,
    user.name,
    user.email,
    user.password,
    user.role,
  ]);

  const csvContent = [
    headers.join(","), // header row
    ...rows.map((row) => row.join(",")) // data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "filtered_users.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  //downloding filter data
  const downloadFilteredPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Filtered User Details", 10, 10);

  const headers = ["Sr. No", "Name", "Email", "Password", "Role"];

  const rows = filteredusers.map((user, index) => [
    index + 1,
    user.name,
    user.email,
    user.password,
    user.role,
  ]);

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 20,
  });

  doc.save("filtered_users.pdf");
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
            <UserFilters onFilter={handleFilter} downloadCSV={downloadFilteredCSV} downloadPDF={ downloadFilteredPDF} />
            <UserTable
              users={filteredusers}
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
          Dashboard &gt; Users
        </div>
            <button onClick={() => handleOptionClick("EnterDetails")}>
              <img src="/Images/Side errow.png" height="15px" width="15px" /> Add Users
            </button>
            
            <br />
            <button onClick={() => handleOptionClick("ViewDetails")}>
              <img src="/Images/Side errow.png" height="15px" width="15px" /> View Users
            </button>
          </div>

        

          {/* Render student-specific content */}
          <div className="main-section">{renderStudentContent()}</div>
        </>
      );
    }
  
    
  

  return <div className="dashboard">{rendersContent()}</div>;
  };

export default U_Dashboard;
 