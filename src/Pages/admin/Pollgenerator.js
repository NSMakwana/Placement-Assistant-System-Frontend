import React, { useState } from "react";
import axios from "axios";
import "./Pollgenerator.css"

export default function PollGenerator() {
  const [company, setCompany] = useState("");
  const [batch, setBatch] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const updated = [...options];
      updated.splice(index, 1);
      setOptions(updated);
    }
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const sendPoll = async () => {
    if (!company || !batch || !question || options.some(o => !o)) {
      alert("All fields are required.");
      return;
    }

    const pollData = {
      companyName: company,
      batch,
      question,
      options
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
      console.error(err);
      alert("Error sending poll");
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
      />

      <label>Batch</label>
      <input
        type="text"
        placeholder="2024, 2025, etc."
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
      />

      <label>Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label>Options</label>
      {options.map((opt, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
          <input
            type="text"
            value={opt}
            onChange={(e) => updateOption(index, e.target.value)}
          />
          <button onClick={() => removeOption(index)}>X</button>
        </div>
      ))}

      <button onClick={addOption}>Add Option</button>

      <br /><br />
      <button onClick={sendPoll} className="send-btn">
        Send Poll
      </button>
    </div>
  );
}
