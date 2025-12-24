// src/Pages/Admin/AdminChatWindow.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminChat.css";
export default function AdminChatWindow({ selectedUser }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const loadMessages = async () => {
    if (!selectedUser) return;
    try {
      const url = `https://placement-assistant-system.onrender.com/api/chat/get/${loggedUser.id}/${selectedUser.id}`;
      const res = await axios.get(url);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!text.trim() || !selectedUser) return;
    try {
      const res = await axios.post(
        "https://placement-assistant-system.onrender.com/api/chat/send",
        {
          senderId: loggedUser.id,
          receiverId: selectedUser.id,
          message: text,
        }
      );
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  if (!selectedUser)
    return <div className="admin-chat-window-empty">Select a user to chat</div>;

  return (
    <div className="admin-chat-window">
      <div className="admin-chat-header">{selectedUser.name}</div>

      <div className="admin-chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.senderId === loggedUser.id
                ? "admin-chat-message sent"
                : "admin-chat-message received"
            }
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="admin-chat-input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
