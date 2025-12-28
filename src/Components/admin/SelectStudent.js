import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectStudent.css";

const SelectStudents = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { companyId, designation, roundName: initialRoundName } =
    location.state || {};

  const [roundName, setRoundName] = useState(initialRoundName || "");
  const [isFinalRound, setIsFinalRound] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!companyId || !designation) {
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://placement-assistant-system.onrender.com/api/applications/${companyId}/${designation}`
        );

        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [companyId, designation]);

  const toggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selectedStudents.length === 0) {
      alert("Select at least one student");
      return;
    }
    const selectedStudentObjects = students.filter(s =>
  selectedStudents.includes(s.id)
);
    navigate("/admin/result/enter-result/page3", {
      state: {
        companyId,
        designation,
        roundName,
        isFinalRound,
        selectedStudents: selectedStudentObjects,
      },
    });
  };

  return (
    <div className="select-students-container">
      <h2>Select Students</h2>

     <div className="round-info">
  <input
    type="text"
    placeholder="Enter Round Name"
    value={roundName}
    onChange={(e) => setRoundName(e.target.value)}
  />

  <label>
    <input
      type="checkbox"
      checked={isFinalRound}
      onChange={(e) => setIsFinalRound(e.target.checked)}
    />
    Final Round
  </label>
</div>


      <input
        className="search-input"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="student-list">
  {students
    .filter((s) =>
      s.name?.toLowerCase().includes(search.toLowerCase())
    )
    .map((s) => (
      <div
        key={s.id}
        className={`student-row ${
          selectedStudents.includes(s.id) ? "selected" : ""
        }`}
        onClick={() => toggleStudent(s.id)}
      >
        <input
          type="checkbox"
          checked={selectedStudents.includes(s.id)}
          onChange={() => toggleStudent(s.id)}
        />
        {s.name}
      </div>
    ))}
</div>

      <button onClick={handleNext}>Next →</button>
    </div>
  );
};

export default SelectStudents;
