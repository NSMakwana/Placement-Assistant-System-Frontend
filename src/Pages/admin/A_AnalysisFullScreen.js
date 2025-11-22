import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./A_AnalysisFullScreen.css";
import A_AnalysisDashboard from "./A_AnalysisDashboard";

const A_AnalysisFullScreen = () => {
  const navigate = useNavigate();
  const [selectedGraph, setSelectedGraph] = useState(null);

  const handleBack = () => navigate(-1);

  return (
    <div className="analysis-fullscreen-container">
      <button className="back-btn" onClick={handleBack}>← Back</button>

      {/* GRID OF ALL GRAPHS */}
      <div className="analysis-grid">

        <div className="graph-card" onClick={() => setSelectedGraph("placement")}>
          <A_AnalysisDashboard section="placement" />
        </div>

        <div className="graph-card" onClick={() => setSelectedGraph("package")}>
          <A_AnalysisDashboard section="package" />
        </div>

        <div className="graph-card" onClick={() => setSelectedGraph("placedcompany")}>
          <A_AnalysisDashboard section="placedcompany" />
        </div>

        <div className="graph-card" onClick={() => setSelectedGraph("offers")}>
          <A_AnalysisDashboard section="offers" />
        </div>

        <div className="graph-card" onClick={() => setSelectedGraph("branch")}>
          <A_AnalysisDashboard section="branch" />
        </div>

        <div className="graph-card" onClick={() => setSelectedGraph("course")}>
          <A_AnalysisDashboard section="course" />
        </div>
      </div>

      {/* MODAL POPUP */}
      {selectedGraph !== null && (
        <div className="graph-modal-overlay" onClick={() => setSelectedGraph(null)}>
          <div className="graph-modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setSelectedGraph(null)}>✖</span>

            <A_AnalysisDashboard section={selectedGraph} fullscreen />
          </div>
        </div>
      )}
    </div>
  );
};

export default A_AnalysisFullScreen;
