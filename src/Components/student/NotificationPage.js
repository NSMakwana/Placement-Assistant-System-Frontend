import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NotificationPage.css";

export default function NotificationPage({ studentId }) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `https://placement-assistant-system.onrender.com/api/notifications/student/${studentId}`
      );
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `https://placement-assistant-system.onrender.com/api/notifications/mark-read/${id}`
      );
      fetchNotifications();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const openPoll = (pollId) => {
    navigate(`/poll/${pollId}`);  
  };

  useEffect(() => {
    if (studentId) fetchNotifications();
  }, [studentId]);

  return (
    <div className="notification">
      <h2>Notifications</h2>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            background: n.read ? "#f0f0f0" : "#fff",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <h4>{n.title}</h4>
          <p>{n.message}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
          <br />

          {/* If notification is linked to a poll */}
          {n.pollId && (
            <button
              onClick={() => openPoll(n.pollId)}
              style={{
                marginTop: "10px",
                background: "#007bff",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Answer Poll
            </button>
          )}

          {/* Mark as read button */}
          {!n.read && (
            <button
              onClick={() => markAsRead(n.id)}
              style={{ marginLeft: "10px" }}
            >
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
