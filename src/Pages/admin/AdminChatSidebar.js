// src/Pages/Admin/AdminChatSidebar.jsx

import React, { useState, useEffect } from "react";


export default function AdminChatSidebar({ users, selectedUser, setSelectedUser }) {
    // define search state
const [searchTerm, setSearchTerm] = useState(""); // define search state

    return (
        <div className="admin-chat-sidebar">
            <h3 className="admin-chat-title">Chats</h3>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-chat-search"
            />
            {users
  .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .map(u => (
    <div
      key={u.id}
      className={"admin-chat-user-item " + (selectedUser?.id === u.id ? "admin-chat-active" : "")}
      onClick={() => setSelectedUser(u)}
    >
      <div className="admin-chat-user-avatar">{u.name.charAt(0).toUpperCase()}</div>
      <div>
        <div className="admin-chat-user-name">{u.name}</div>
        <div className="admin-chat-user-role">{u.role}</div>
      </div>
    </div>
))}

        </div>
    );
}
