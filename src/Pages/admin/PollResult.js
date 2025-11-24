import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import useStudent from "../../hooks/UseStudent"; 
import "./PollResult.css";

export default function PollResults() {
  const { pollId } = useParams();
  const { student, loading: studentLoading } = useStudent();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const pollRes = await axios.get(
        `https://placement-assistant-system.onrender.com/api/polls/${pollId}`
      );
      setPoll(pollRes.data);

      const res = await axios.get(
        `https://placement-assistant-system.onrender.com/api/polls/results/${pollId}`
      );
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [pollId]);

  const exportToXlsx = () => {
    if (!results || results.length === 0) {
      alert("No results to export.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(results.map(r => ({
      Option: r.option,
      Votes: r.count,
      Name: student?.name || "",
      Email: student?.email || "",
      Course: student?.course || ""
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Poll Results");

    const fileName = `${(poll?.companyName || "poll")}_${pollId}_results.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (!poll || studentLoading) return <div className="container card">Loading poll...</div>;

  return (
    <div className="poll-results-container">
      <div className="poll-results-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <h2>Poll Results</h2>
            <div className="small">
              Company: {poll.companyName} • Batch: {poll.batch}
            </div>
            <div className="small" style={{ marginTop: 6 }}>{poll.question}</div>
            <div className="small" style={{ marginTop: 4 }}>
              Student: {student?.name} • Email: {student?.email} • Course: {student?.course}
            </div>
          </div>

          <div className="poll-results-right">
            <button className="poll-results-btn btn-ghost" onClick={exportToXlsx} style={{ marginRight: 8 }}>
              Export XLSX
            </button>
            <button className="poll-results-btn btn-ghost" onClick={fetchResults}>
              Refresh
            </button>
          </div>
        </div>

        <div className="poll-results-results-wrap">
          <div className="poll-results-chart-card card">
            <h3>Votes by Option</h3>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="option" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0b84ff" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="poll-results-summary-card card">
            <h3>Summary</h3>
            {results.length === 0 && <p className="small">No responses yet.</p>}

            {results.map((r) => (
              <div key={r.option} className="poll-results-summary-item">
                <div>
                  <div style={{ fontWeight: 700 }}>{r.option}</div>
                  <div className="small">votes</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{r.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
