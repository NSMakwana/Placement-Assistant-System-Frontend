import React, { useState } from "react";
import axios from "axios";
import "./Pollgenerator.css";

export default function PollGenerator() {
  const [company, setCompany] = useState("");
  const [batch, setBatch] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  // Add a new option input
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // Remove an option input
  const removeOption = (index) => {
    if (options.length > 1) {
      const updated = [...options];
      updated.splice(index, 1);
      setOptions(updated);
    }
  };

  // Update option value
  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  // Send poll to backend
  const sendPoll = async () => {
    if (!company || !batch || !question || options.some(o => !o.trim())) {
      alert("All fields are required.");
      return;
    }

    const pollData = {
      companyName: company.trim(),
      batch: batch.trim(),
      question: question.trim(),
      options: options.map(o => o.trim())
    };

    try {
      await axios.post(
        "https://placement-assistant-system.onrender.com/api/polls/create",
        pollData
      );

      alert("Poll sent successfully!");
      setCompany("");
      setBatch("");
      setQuestion("");
      setOptions([""]);
    } catch (err) {
      console.error("Error sending poll:", err);
      alert("Error sending poll. Check console for details.");
    }
  };

  return (
    <div className="poll-generator">
      <h2>Create Poll</h2>

      <label>Company Name</label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter company name"
      />

      <label>Target Batch</label>
      <input
        type="text"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        placeholder="2023-2024, 2024-2025, etc."
      />

      <label>Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter the poll question"
      />

      <label>Options</label>
      {options.map((opt, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
          <input
            type="text"
            value={opt}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <button type="button" onClick={() => removeOption(index)}>X</button>
        </div>
      ))}

      <button type="button" onClick={addOption}>Add Option</button>
      <br /><br />
      <button type="button" onClick={sendPoll} className="send-btn">
        Send Poll
      </button>
    </div>
  );
}
