import { useState, useEffect } from "react";
import axios from "axios";

export default function useStudent() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://placement-assistant-system.onrender.com/api/students/by-user/${user.userId}`
        );
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  return { student, loading };
}
