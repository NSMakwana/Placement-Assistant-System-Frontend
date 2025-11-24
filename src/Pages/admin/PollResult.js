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
import "./PollList.css";

export default function PollResults() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);

  // fetch poll and results structure expected: [{ option: 'Yes', count: 12 }, ...]
  const fetchResults = async () => {
    try {
      const pollRes = await axios.get(
        `https://placement-assistant-system.onrender.com/api/polls/${pollId}`
      );
      setPoll(pollRes.data);

      // Hit your backend endpoint which returns aggregated counts per option
      const res = await axios.get(
        `https://placement-assistant-system.onrender.com/api/poll-response/results/${pollId}`
      );
      // Expect: res.data = [{ option: 'Yes', count: 12 }, ...]
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
    // Convert results array to worksheet
    const ws = XLSX.utils.json_to_sheet(results.map(r => ({
      Option: r.option,
      Votes: r.count
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Poll Results");

    const fileName = `${(poll?.companyName || "poll")}_${pollId}_results.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (!poll) return <div className="container card">Loading poll...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <h2>Poll Results</h2>
            <div className="small">Company: {poll.companyName} • Batch: {poll.batch}</div>
            <div className="small" style={{ marginTop: 6 }}>{poll.question}</div>
          </div>

          <div className="right">
            <button className="btn btn-ghost" onClick={exportToXlsx} style={{ marginRight: 8 }}>
              Export XLSX
            </button>
            <button className="btn btn-ghost" onClick={fetchResults}>
              Refresh
            </button>
          </div>
        </div>

        <div className="results-wrap">
          <div className="chart-card card">
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

          <div className="summary-card card">
            <h3>Summary</h3>
            {results.length === 0 && <p className="small">No responses yet.</p>}

            {results.map((r) => (
              <div key={r.option} className="summary-item">
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
