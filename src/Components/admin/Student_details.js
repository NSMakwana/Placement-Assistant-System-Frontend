import React, { useState, useEffect } from "react";
//import axios from "axios";
// import "./StudentDetails.css";

function StudentDetails() {
  const [batch, setBatch] = useState(""); // State for Batch filter
  const [course, setCourse] = useState(""); // State for Course filter
  const [students, setStudents] = useState([]); // State for student data
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Function to Fetch Students from Backend
  const fetchStudents = async () => {
    setLoading(true); // Show loading spinner
    // try {
    //   const response = await axios.get("http://localhost:8080/students", {
    //     params: { batch, course }, // Send filters as query params
    //   });
    //   setStudents(response.data); // Update student data
    // } catch (error) {
    //   console.error("Error fetching students:", error);
    // }
    // setLoading(false); // Hide loading spinner
  };

  // Fetch students whenever filters (batch or course) change
  useEffect(() => {
    fetchStudents();
  }, [batch, course]);

  // To write a greater than sign in React JSX, use the plain '>' character.
  // Example: a &gt; b will render as "a > b" in HTML, but in JSX you can just use '>'.
  // If you want to use the HTML entity, you can use &gt; as well.

  return (
    <div className="student-details">
      <h4>Dashboard &gt; Student Details</h4>

      {/* Example usage of greater than sign */}
      <div>
        <span>5 &gt; 3</span> {/* This will render as: 5 > 3 */}
        <span>{5 > 3 ? "True" : "False"}</span> {/* This will render as: True */}
      </div>

      {/* Filters Section */}
      <div className="filters">
        <div className="filter">
          <label htmlFor="batch">Batch:</label>
          <select
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">All</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">All</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Student Details Table */}
          <h5>Student Details</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Batch</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.srNo}</td>
                    <td>{student.name}</td>
                    <td>{student.batch}</td>
                    <td>{student.course}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default StudentDetails;
