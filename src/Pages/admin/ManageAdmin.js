import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageAdmin.css";

function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Sub Admin" });

  const API_URL = "https://placement-assistant-system.onrender.com/api/admins"; // change when deployed

  // Fetch all admins
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await axios.get(API_URL);
    setAdmins(res.data);
  };

  // Add new admin
  const addAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) {
      alert("Please fill in all fields");
      return;
    }
    await axios.post(API_URL, newAdmin);
    setNewAdmin({ name: "", email: "", role: "Sub Admin" });
    fetchAdmins(); // refresh list
  };

  // Toggle role
  const toggleRole = async (admin) => {
    const newRole = admin.role === "Sub Admin" ? "Admin" : "Sub Admin";
    await axios.put(`${API_URL}/${admin.id}`, { ...admin, role: newRole });
    fetchAdmins();
  };

  // Remove admin
  const removeAdmin = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchAdmins();
  };

  return (
    <div className="manage-admin">
      <h2>Manage Admins</h2>

      {/* Add Admin Form */}
      <form className="add-admin-form" onSubmit={addAdmin}>
        <input
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <select
          value={newAdmin.role}
          onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
        >
          <option value="Sub Admin">Sub Admin</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">➕ Add Admin</button>
      </form>

      {/* Admin Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button onClick={() => toggleRole(admin)}>
                  {admin.role === "Sub Admin" ? "Make Admin" : "Make Sub Admin"}
                </button>
                <button className="remove-btn" onClick={() => removeAdmin(admin.id)}>
                  ❌ Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageAdmin;
