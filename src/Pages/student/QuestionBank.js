import React, { useState, useEffect } from "react";
import "./QuestionBank.css";

function QuestionBank() {
  const [activeTab, setActiveTab] = useState("add");
  const [batch, setBatch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch companies for selected batch
  useEffect(() => {
    if (batch) {
      fetch(
        `https://placement-assistant-system.onrender.com/api/companies/batch/${batch}`
      )
        .then((res) => res.json())
        .then((data) => setCompanies(data));
    }
  }, [batch]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("batch", batch);
    formData.append("companyName", companyName);
    formData.append("file", file);

    const response = await fetch(
      "https://placement-assistant-system.onrender.com/api/question-bank/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("File uploaded successfully!");
      setBatch("");
      setCompanyName("");
      setFile(null);
    } else {
      alert("Upload failed!");
    }
  };

  const fetchFiles = async () => {
    const res = await fetch(
      `https://placement-assistant-system.onrender.com/api/question-bank/filter?batch=${batch}&companyName=${companyName}`
    );
    const data = await res.json();
    setFiles(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(
      `https://placement-assistant-system.onrender.com/api/question-bank/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      alert("Deleted successfully");
      setFiles(files.filter((f) => f.id !== id));
    }
  };

  const handleDownload = (id) => {
    window.location.href = `https://placement-assistant-system.onrender.com/api/question-bank/download/${id}`;
  };

  return (
    <div className="questionbank-container">
      <div className="breadcrumb_qb">Dashboard &gt; Question Bank</div>

      <div className="questionbank-tabs">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add File
        </button>
        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
          View Files
        </button>
      </div>

      {/* Add File */}
      {activeTab === "add" && (
        <form className="questionbank-form" onSubmit={handleUpload}>
          <label>Batch:</label>
          <input
            type="text"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          />

          <label>Company Name:</label>
          <select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          >
            <option value="">--Select Company--</option>
            {companies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload</button>
        </form>
      )}

      {/* View Files */}
      {activeTab === "view" && (
        <div>
          <form
            className="questionbank-form"
            onSubmit={(e) => {
              e.preventDefault();
              fetchFiles();
            }}
          >
            <label>Batch:</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />

            <label>Company:</label>
            <select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            >
              <option value="">--Select Company--</option>
              {companies.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button type="submit">Search</button>
          </form>

          <table className="questionbank-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.id}>
                  <td>{f.fileUrl.split("/").pop()}</td>
                  <td>
                    <button
                      className="download"
                      onClick={() => handleDownload(f.id)}
                    >
                      Download
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(f.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default QuestionBank;
