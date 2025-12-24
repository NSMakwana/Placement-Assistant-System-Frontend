// src/Pages/Admin/AdminChatPage.jsx
import React, { useState, useEffect } from "react";
import AdminChatSidebar from "./AdminChatSidebar";
import AdminChatWindow from "./AdminChatWindow";
import "./AdminChat.css";
import axios from "axios";

export default function AdminChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedAdminChatUser")) || null
  );

  const loggedUser = JSON.parse(localStorage.getItem("user")); // admin data

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://placement-assistant-system.onrender.com/api/chat/users"
        );

        // Remove logged admin from list
        const filtered = res.data.filter((u) => u.id !== loggedUser.id);
        setUsers(filtered);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);




  const handleSelectUser = (user) => {
    setSelectedUser(user);
    localStorage.setItem("selectedAdminChatUser", JSON.stringify(user));
  };

  return (
    <div className="admin-chat-page">
      <AdminChatSidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={handleSelectUser}
      />
      <AdminChatWindow selectedUser={selectedUser} />
    </div>
  );
}
