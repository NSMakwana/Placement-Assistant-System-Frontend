import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import "./chat.css";
import axios from "axios";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedChatUser")) || null
  );

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://placement-assistant-system.onrender.com/api/chat/users"
        );

        // Remove logged user from list
        const filtered = res.data.filter((u) => u.id !== loggedUser.id);
        setUsers(filtered);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // Save selected user to localStorage
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    localStorage.setItem("selectedChatUser", JSON.stringify(user));
  };

  return (
    <div className="wa-chat-page">
      <ChatSidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={handleSelectUser}
      />

      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}
