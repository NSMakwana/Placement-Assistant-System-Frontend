import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PollanswerPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(`https://placement-assistant-system.onrender.com/api/polls/${pollId}`);
        setPoll(res.data);
      } catch (err) {
        console.error(err);
        navigate(-1);
      }
    };
    fetchPoll();
  }, [pollId]);

  const submitPoll = async () => {
    if (!selectedOption) return alert("Select an option");
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post(`https://placement-assistant-system.onrender.com/api/poll-responses/submit/${pollId}`, {
      pollId,
      studentId: user.id,
      studentName: user.name,
      answer: selectedOption
    });
    alert("Poll submitted!");
    navigate(-1);
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h2>{poll.companyName} Poll</h2>
      <p>{poll.question}</p>
      {poll.options.map((opt, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="pollOption"
            value={opt}
            checked={selectedOption === opt}
            onChange={e => setSelectedOption(e.target.value)}
          />
          {opt}
        </div>
      ))}
      <button onClick={submitPoll}>Submit</button>
    </div>
  );
}
