import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationPage({ studentId }) {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await axios.get(`/api/notifications/student/${studentId}`);
    setNotifications(res.data);
  };

  const markAsRead = async (id) => {
    await axios.put(`/api/notifications/mark-read/${id}`);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map(n => (
        <div key={n.id} style={{ background: n.read ? "#f0f0f0" : "#fff", margin: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
          <h4>{n.title}</h4>
          <p>{n.message}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
          {!n.read && <button onClick={() => markAsRead(n.id)}>Mark as Read</button>}
        </div>
      ))}
    </div>
  );
}
