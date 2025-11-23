import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationBell({ studentId }) {
  const [notifications, setNotifications] = useState([]);
  
  const fetchNotifications = async () => {
    const res = await axios.get(`/api/notifications/student/${studentId}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <button onClick={fetchNotifications}>
        🔔 {unreadCount > 0 && <span>{unreadCount}</span>}
      </button>
    </div>
  );
}
