import React, { useEffect, useState } from "react";
import "./EnterResult.css";
import { useNavigate } from "react-router-dom";


const EnterResult = ({ selectedCompany, selectedDesignation }) => {
  const [rounds, setRounds] = useState([]);
  const [newRound, setNewRound] = useState("");
const navigate = useNavigate();
  // Fetch rounds for selected company + designation
  useEffect(() => {
    if (!selectedCompany || !selectedDesignation) {
      setRounds([]);
      return;
    }

    const fetchRounds = async () => {
      try {
        const response = await fetch(
          `https://placement-assistant-system.onrender.com/api/companies/${selectedCompany.name}/designations/${selectedDesignation}/rounds`
        );

        if (response.ok) {
          const data = await response.json();
          setRounds(data);
        } else {
          console.error("Failed to fetch rounds.");
        }
      } catch (err) {
        console.error("Error fetching rounds:", err);
      }
    };

    fetchRounds();
  }, [selectedCompany, selectedDesignation]);

  // Add new round
  const handleAddRound = async () => {
    if (!newRound.trim()) return alert("Enter round name!");

    try {
      const response = await fetch(
        `https://placement-assistant-system.onrender.com/api/companies/${selectedCompany.name}/designations/${selectedDesignation}/rounds`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roundName: newRound }),
        }
      );

      if (response.ok) {
        alert("Round added!");
        setNewRound("");
        const updated = await response.json();
        setRounds(updated);
      }
    } catch (error) {
      console.error("Error adding round:", error);
    }
  };

  // Delete a round
  const handleDeleteRound = async (roundNo) => {
    if (!window.confirm("Delete this round?")) return;

    try {
      const response = await fetch(
        `https://placement-assistant-system.onrender.com/api/companies/${selectedCompany}/designations/${selectedDesignation}/rounds/${roundNo}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Round deleted!");
        setRounds(rounds.filter((r) => r.round_no !== roundNo));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  

  return (
    <div className="enter-result-container">

      <h2>Rounds for Selected Designation</h2>

      {/* ROUND LIST TABLE */}
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Round Name</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rounds.length > 0 ? (
            rounds.map((round, index) => (
              <tr key={round.round_no}>
                <td>{index + 1}</td>
                <td>{round.round}</td>

                <td>
                  <button
                    className="enter-btn"
                    onClick={() =>
                      navigate("/admin/result/enter-result/page2", {
                        state: {
                          companyId: selectedCompany.id,
                          designation: selectedDesignation,
                          roundNo: round.round_no,
                          roundName: round.round,
                        },
                      })
                    }
                  >
                    Enter Result
                  </button>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRound(round.round_no)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No rounds added yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ADD NEW ROUND */}
      <div className="add-round-section">
        <input
          type="text"
          placeholder="Enter new round"
          value={newRound}
          onChange={(e) => setNewRound(e.target.value)}
        />
        <button onClick={handleAddRound}>Add Round</button>
      </div>
    </div>
  );
};

export default EnterResult;
