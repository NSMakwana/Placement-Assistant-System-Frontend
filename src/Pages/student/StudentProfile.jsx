import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
  const [showChangePass, setShowChangePass] = useState(false);

  const student = {
    name: "Student User",
    email: "student@example.com",
    role:"Student"
  };

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handlePasswordChange = () => {
    if (!currentPass || !newPass || !confirmPass) {
      toast.error("All fields are required!");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    toast.success("Password updated successfully!");

    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setShowChangePass(false);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Student Profile</h2>

        {/* Basic Details */}
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Role:</strong> {student.role}</p>


        <button
          style={{
            marginTop: "15px",
            padding: "10px 16px",
            borderRadius: "8px",
            background: "#008CBA",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowChangePass(!showChangePass)}
        >
          {showChangePass ? "Cancel" : "Change Password"}
        </button>

        {showChangePass && (
          <div style={{ marginTop: "25px" }}>
            <h3>Change Password</h3>

            <label>Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              style={inputStyle}
            />

            <label>New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              style={inputStyle}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              style={inputStyle}
            />

            <button
              style={{
                marginTop: "15px",
                padding: "10px 16px",
                borderRadius: "8px",
                background: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handlePasswordChange}
            >
              Update Password
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default StudentProfile;
