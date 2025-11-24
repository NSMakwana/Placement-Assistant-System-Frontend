import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PollPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("user"));

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const fetchPoll = async () => {
    try {
      const res = await axios.get(
        `https://placement-assistant-system.onrender.com/api/polls/${pollId}`
      );
      setPoll(res.data);
    } catch (err) {
      console.error("Error fetching poll", err);
    }
  };

  const submitAnswer = async () => {
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }

    try {
      await axios.post(
        `https://placement-assistant-system.onrender.com/api/polls/response`,
        {
          pollId,
          studentId: student.id,
          answer: selectedOption,
        }
      );

      alert("Your response has been submitted!");
      navigate("/student/notifications");
    } catch (err) {
      console.error(err);
      alert("Failed to submit poll response.");
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  if (!poll) return <div>Loading poll...</div>;

  if (!poll.isActive)
    return (
      <div className="poll-closed">
        <h2>{poll.question}</h2>
        <p>⚠ This poll is now closed.</p>
      </div>
    );

  return (
    <div className="poll-page">
      <h2>{poll.question}</h2>

      {poll.options.map((opt, index) => (
        <div key={index}>
          <input
            type="radio"
            name="poll"
            value={opt}
            onChange={() => setSelectedOption(opt)}
          />
          {opt}
        </div>
      ))}

      <button onClick={submitAnswer} style={{ marginTop: "15px" }}>
        Submit Answer
      </button>
    </div>
  );
}
