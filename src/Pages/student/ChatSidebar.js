import React, { useState, useEffect } from "react";

export default function ChatSidebar({ users, selectedUser, setSelectedUser }) {
  const [searchTerm, setSearchTerm] = useState(""); // define search state
  
      return (
          <div className="wa-chat-sidebar">
              <h3 className="admin-chat-title">Chats</h3>
              <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="wa-chat-search"
              />
              {users
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(u => (
      <div
        key={u.id}
        className={"wa-chat-user-item " + (selectedUser?.id === u.id ? "wa-chat-active" : "")}
        onClick={() => setSelectedUser(u)}
      >
        <div className="wa-chat-user-avatar">{u.name.charAt(0).toUpperCase()}</div>
        <div>
          <div className="wa-chat-user-name">{u.name}</div>
          <div className="wa-chat-user-role">{u.role}</div>
        </div>
      </div>
  ))}
  
          </div>
      );
  }