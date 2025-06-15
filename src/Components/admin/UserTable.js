import React from "react";
import "./StudentTable.css";

const UserTable = ({ users, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="no-users-message">
        <img id="nodata" src="/Images/Nodata.png" height="250px" width="250px" alt="No data available" />
        <center>No users to display</center>
      </div>
    );
  } else {
    // Initialize index explicitly
    

    console.log(users);
    
    return (
      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Roll. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            users.map((student,index) => {
              index += 1; // Increment index explicitly
              return (
                <tr key={student.eno || index}>
                  <td>{index}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                  <td>
                    <div className="action">
                     
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this student?"
                          );
                          if (confirmDelete) {
                            onDelete(student.eno); // Pass the student's ID to the onDelete function
                          }
                        }}
                      >
                        <img src="/Images/Delete.png" height="12px" width="15px" alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default UserTable;
