import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setLoading(false);
  }, []);

  if (loading) return null; // or loader
const u = JSON.parse(localStorage.getItem("user"));
  console.log("PRIVATE ROUTE USER 👉", u);

  if (user && allowedRoles.includes(user.role)) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
