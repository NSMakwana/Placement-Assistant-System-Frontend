import React, { useEffect, useState } from "react";
import "./ViewResult.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png"; // adjust path
// import * as XLSX from "xlsx";

const ViewResult = ({ selectedCompany, selectedDesignation }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roundFilter, setRoundFilter] = useState("");



const exportExcel = () => {
  // Group results by round
  const roundMap = {};

  results.forEach(r => {
    if (!roundMap[r.roundName]) {
      roundMap[r.roundName] = [];
    }

    roundMap[r.roundName].push({
      Name: r.studentName,
      Email: r.studentEmail,
      Marks: r.marks ?? "-",
      Status: r.status,
      Placement: r.placementStatus
    });
  });

  const workbook = XLSX.utils.book_new();

  // Create one sheet per round
  Object.keys(roundMap).forEach(round => {
    const worksheet = XLSX.utils.json_to_sheet(roundMap[round]);
    XLSX.utils.book_append_sheet(workbook, worksheet, round);
  });

  XLSX.writeFile(
    workbook,
    `${selectedCompany.name}_${selectedDesignation}_Results.xlsx`
  );
};

const exportPDF = () => {
  const doc = new jsPDF();

  // LOGO
  doc.addImage(logo, "PNG", 10, 8, 25, 25);

  // HEADER TEXT
  doc.setFontSize(14);
  doc.text("Department of Computer Science, Gujarat University", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Company: ${selectedCompany.name}  Designation: ${selectedDesignation}`, 105, 22, { align: "center" });
  doc.text(`Batch: 2024-25`, 105, 28, { align: "center" });

  doc.line(10, 35, 200, 35);

  // TABLE
  autoTable(doc, {
    startY: 40,
    head: [[
      "Name",
      "Email",
      "Round",
      "Status",
      "Marks",
      "Placement"
    ]],
    body: results.map(r => [
      r.studentName,
      r.studentEmail,
      r.roundName,
      r.status,
      r.marks ?? "-",
      r.placementStatus
    ]),
    styles: { fontSize: 9 }
  });

  const pageHeight = doc.internal.pageSize.height;

  // Date
  const today = new Date().toLocaleDateString();

  doc.setFontSize(10);
  doc.text(`Date: ${today}`, 14, pageHeight - 25);

  // Signature
  doc.text("Authorized Signature", pageHeight - 80, pageHeight - 25);
  doc.line(
    pageHeight - 120,
    pageHeight - 23,
    pageHeight - 20,
    pageHeight - 23
  );

  doc.save(
    `${selectedCompany.name}_${selectedDesignation}_Results.pdf`
  );
};


  useEffect(() => {
    if (!selectedCompany || !selectedDesignation) return;

    setLoading(true);

   let url =`https://placement-assistant-system.onrender.com/api/results/` +
  `company?companyId=${selectedCompany.id}&designation=${selectedDesignation}`;

if (roundFilter) {
  url =`https://placement-assistant-system.onrender.com/api/results/` +
  `summary?companyId=${selectedCompany.id}&designation=${selectedDesignation}&roundName=${roundFilter}`;
;
}

fetch(url)
  .then(res => res.json())
  .then(data => setResults(data))
  .finally(() => setLoading(false)); 

  }, [selectedCompany, selectedDesignation,roundFilter]);

  const total = results.length;
  const cleared = results.filter(r => r.status === "Cleared").length;
  const notCleared = results.filter(r => r.status === "Not Cleared").length;
  const placed = results.filter(r => r.placementStatus === "Placed").length;

  if (!selectedCompany) {
    return <p>Select filters to view results</p>;
  }

  return (
    <div className="view-result-container">
          <select value={roundFilter} onChange={(e) => setRoundFilter(e.target.value)}>
              <option value="">All Rounds</option>
              {[...new Set(results.map(r => r.roundName))].map(r => (
                  <option key={r} value={r}>{r}</option>
              ))}
          </select>
          <div className="export-buttons">
              <button onClick={exportExcel}>Export Excel</button>
              <button onClick={exportPDF}>Export PDF</button>
          </div>


      {/* SUMMARY CARDS */}
      <div className="result-cards">
        <div className="card total">Total<br />{total}</div>
        <div className="card cleared">Cleared<br />{cleared}</div>
        <div className="card failed">Not Cleared<br />{notCleared}</div>
        <div className="card placed">Placed<br />{placed}</div>
      </div>

      {/* RESULT TABLE */}
      <div className="result-table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Round</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Placement</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id}>
              <td>{r.studentName}</td>
              <td>{r.roundName}</td>
              <td>{r.status}</td>
              <td>{r.marks ?? "-"}</td>
              <td>{r.placementStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading results...</p>}
    </div>
    </div>
  );
};

export default ViewResult;
