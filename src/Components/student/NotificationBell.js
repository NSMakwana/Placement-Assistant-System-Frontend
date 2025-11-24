import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NotificationBell({ studentId }) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const res = await axios.get(`https://placement-assistant-system.onrender.com/api/notifications/student/${studentId}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <button onClick={() => navigate("/student/notifications")}>
        🔔 {unreadCount > 0 && <span>{unreadCount}</span>}
      </button>
    </div>
  );
}
