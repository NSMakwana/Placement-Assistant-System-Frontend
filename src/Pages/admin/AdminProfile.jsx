import React, { useState } from "react";
import "./AdminProfile.css";

function AdminProfile() {
  const [showChangePass, setShowChangePass] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    role:"Admin"
  };

  const handlePasswordChange = () => {
    if (!currentPass || !newPass || !confirmPass) {
      triggerToast("All fields are required!");
      return;
    }

    if (newPass !== confirmPass) {
      triggerToast("New password & confirm password do not match!");
      return;
    }

    triggerToast("Password updated successfully!");

    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setShowChangePass(false);
  };

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="admin-profile-wrapper">

      {/* TOAST */}
      {showToast && <div className="toast-box">{toastMsg}</div>}

      {/* Profile Card */}
      <div className="admin-card">
        <h2>Admin Profile</h2>

        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.role}</p>

        <button
          className="btn-toggle"
          onClick={() => setShowChangePass(!showChangePass)}
        >
          {showChangePass ? "Cancel" : "Change Password"}
        </button>
      </div>

      {/* Password Change Card */}
      {showChangePass && (
        <div className="admin-card pass-card">
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

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button className="btn-submit" onClick={handlePasswordChange}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
