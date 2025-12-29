import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EnterMarks.css";

const EnterMarks = () => {
  const location = useLocation();

  const {
    companyId,
    designation,
    roundName,
    isFinalRound,
    selectedStudents = [],
  } = location.state || {};

  const [students, setStudents] = useState([]);
  const [results, setResults] = useState({});

  // Initialize students & result structure
  useEffect(() => {
    if (!Array.isArray(selectedStudents) || selectedStudents.length === 0)
      return;

    setStudents(selectedStudents);

    const initResults = {};
    selectedStudents.forEach((s) => {
      initResults[s.id] = {
        marks: "",
        status: "Not Cleared",
        remarks: "",
      };
    });

    setResults(initResults);
  }, [selectedStudents]);

  // Handle input changes
  const handleChange = (studentId, field, value) => {
    setResults((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  // Submit result (FIXED)
  const submitResult = async (student) => {
    const payload = {
      studentId: student.id,
      studentName: student.name,      // ✅ FIXED
      studentEmail: student.email,    // ✅ FIXED
      companyId,
      designation,
      roundName,
      marks: results[student.id]?.marks,
      status: results[student.id]?.status,
      remarks: results[student.id]?.remarks,
      finalRound: isFinalRound,
    };

    try {
      const res = await fetch(
        "https://placement-assistant-system.onrender.com/api/results/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert(`Result saved for ${student.name}`);
      } else {
        alert("Failed to save result");
      }
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  return (
    <div className="enter-marks-container">
      <h2>
        {roundName} {isFinalRound && "(Final Round)"}
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>

              <td>
                <input
                  type="number"
                  value={results[s.id]?.marks || ""}
                  onChange={(e) =>
                    handleChange(s.id, "marks", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  value={results[s.id]?.status}
                  onChange={(e) =>
                    handleChange(s.id, "status", e.target.value)
                  }
                >
                  <option value="Cleared">Cleared</option>
                  <option value="Not Cleared">Not Cleared</option>
                </select>
              </td>

              <td>
                <input
                  type="text"
                  value={results[s.id]?.remarks || ""}
                  onChange={(e) =>
                    handleChange(s.id, "remarks", e.target.value)
                  }
                />
              </td>

              <td>
                <button onClick={() => submitResult(s)}>
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnterMarks;
