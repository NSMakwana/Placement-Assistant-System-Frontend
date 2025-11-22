import React, { useState } from "react";
import "./A_AdminProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const A_AdminProfile = () => {
  const [showChangePass, setShowChangePass] = useState(false);

  const admin = {
    name: "Admin User",
    email: "admin@example.com",
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
    // ✅ THIS FIXES THE OVERLAP
    <div style={{ marginLeft: "260px", padding: "20px" }}>
      <div className="admin-profile-container">
        {/* TOP CARD */}
        <div className="admin-card">
          <h2>Admin Profile</h2>

          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>

          <button
            className="change-pass-btn"
            onClick={() => setShowChangePass(!showChangePass)}
          >
            {showChangePass ? "Cancel" : "Change Password"}
          </button>
        </div>

        {/* CHANGE PASSWORD CARD */}
        {showChangePass && (
          <div className="admin-card change-pass-card">
            <h3>Change Password</h3>

            <label>Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <button className="update-pass-btn" onClick={handlePasswordChange}>
              Update Password
            </button>
          </div>
        )}

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default A_AdminProfile;
