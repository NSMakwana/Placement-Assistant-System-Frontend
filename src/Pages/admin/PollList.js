import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PollList.css";

export default function PollList() {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const res = await axios.get(
        "https://placement-assistant-system.onrender.com/api/polls/all"
      );
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls", err);
    }
  };

  const stopPoll = async (pollId) => {
    try {
      await axios.put(
        `https://placement-assistant-system.onrender.com/api/polls/stop/${pollId}`
      );
      alert("Poll stopped successfully!");
      fetchPolls();
    } catch (err) {
      console.error("Error stopping poll", err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="poll-list">
      <h2>All Polls</h2>

      <table className="poll-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Batch</th>
            <th>Question</th>
            <th>Status</th>
            <th>Stop</th>
            <th>Results</th>
          </tr>
        </thead>

        <tbody>
          {polls.map((poll) => (
            <tr key={poll.id}>
              <td>{poll.companyName}</td>
              <td>{poll.batch}</td>
              <td>{poll.question}</td>

              <td
                className={poll.isActive ? "status-active" : "status-inactive"}
              >
                {poll.isActive ? "Active" : "Inactive"}
              </td>

              <td>
                {poll.isActive && (
                  <button
                    onClick={() => stopPoll(poll.id)}
                    className="stop-btn"
                  >
                    Stop
                  </button>
                )}
              </td>

              <td>
                <Link to={`/admin/poll-results/${poll.id}`}>
                  <button className="results-btn">View Results</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
