import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatWindow({ selectedUser }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // ================================
  //  AUTO REFRESH CHAT MESSAGES
  // ================================
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const url = `https://placement-assistant-system.onrender.com/api/chat/get/${loggedUser.id}/${selectedUser.id}`;
        const res = await axios.get(url);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages(); // initial load
    const interval = setInterval(fetchMessages, 3000); // refresh every 3s

    return () => clearInterval(interval); // cleanup
  }, [selectedUser]);

  // ================================
  // SEND MESSAGE
  // ================================
  const sendMessage = async () => {
    if (!text.trim()) return;

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

  // ================================
  // DELETE MESSAGE
  // ================================
  const deleteMessage = async (id) => {
    try {
      await axios.delete(
        `https://placement-assistant-system.onrender.com/api/chat/delete/${id}`
      );

      // Remove from UI instantly
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!selectedUser)
    return (
      <div className="wa-chat-window-empty">Select a user to chat</div>
    );

  return (
    <div className="wa-chat-window">

      {/* HEADER */}
      <div className="wa-chat-header">
        {selectedUser.name}
      </div>

      {/* CHAT AREA */}
      <div className="wa-chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.senderId === loggedUser.id
                ? "wa-chat-message sent"
                : "wa-chat-message received"
            }
          >
            <div>{msg.message}</div>

            {/* Delete button (only for sender) */}
            {msg.senderId === loggedUser.id && (
              <button
                className="delete-btn"
                onClick={() => deleteMessage(msg.id)}
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      {/* INPUT BOX */}
      <div className="wa-chat-input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
