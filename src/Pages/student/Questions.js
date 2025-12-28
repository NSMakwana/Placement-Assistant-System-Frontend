import React, { useState } from "react";
import "./Questions.css";

const questionBank = {
  "Frontend Developer": [
    "What is the Virtual DOM?",
    "Explain the difference between var, let, and const.",
    "What are React Hooks?",
    "How does CSS Flexbox work?"
  ],
  "Backend Developer": [
    "Explain REST vs SOAP.",
    "What is JWT authentication?",
    "What is the difference between SQL and NoSQL?",
    "Explain event-driven architecture."
  ],
  "Data Analyst": [
    "What is the difference between supervised and unsupervised learning?",
    "Explain normalization in databases.",
    "What is a pivot table?",
    "Explain the concept of outliers."
  ],
  "Cybersecurity Analyst": [
    "What is a firewall?",
    "Explain SQL Injection.",
    "What is hashing and salting?",
    "Define CIA triad."
  ],
  "Cloud Engineer": [
    "What is serverless computing?",
    "Difference between IaaS, PaaS, SaaS.",
    "What is containerization?",
    "What is load balancing?"
  ]
};

const StudentQuestions = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSelect = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setQuestions(questionBank[role] || []);
  };

  return (
    <div className="questions-container">
      <h2 className="questions-title">
        Select the role for which you require questions
      </h2>

      <select
        className="questions-select"
        value={selectedRole}
        onChange={handleSelect}
      >
        <option value="">-- Select Role --</option>
        {Object.keys(questionBank).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      {questions.length > 0 && (
        <div className="questions-card">
          <h3>{selectedRole} Questions</h3>
          <table className="questions-table">
            <thead>
              <tr>
                <th>Question No.</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentQuestions;
