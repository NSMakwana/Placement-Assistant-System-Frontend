// A_AnalysisDashboard.jsx
import React, { useEffect, useState } from "react";
import "./A_AnalysisDashboard.css";
import AnalysisFilter from "../../Components/admin/AnalysisFilter";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import StudentService from "../../Services/StudentServices";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
  Legend as RechartLegend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// -----------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------

const A_AnalysisDashboard = ({ section, fullscreen }) => {
  const [placedCount, setPlacedCount] = useState(0);
  const [nonPlacedCount, setNonPlacedCount] = useState(0);
  const [pending, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);

  // Static data
  const companyData = [
    { company: "TechCorp", package: 10 },
    { company: "Mastek", package: 6 },
    { company: "Social Pilot", package: 8 },
    { company: "TCS", package: 7 },
    { company: "Incubyte", package: 9 },
    { company: "Shaip", package: 5 },
  ];

  const companyPlacedData = [
    { company: "TechCorp", placed: 15 },
    { company: "Mastek", placed: 10 },
    { company: "Social Pilot", placed: 8 },
    { company: "TCS", placed: 18 },
    { company: "Incubyte", placed: 12 },
    { company: "Shaip", placed: 6 },
  ];

  const offersPerYearData = [
    { year: "2020", offers: 45 },
    { year: "2021", offers: 60 },
    { year: "2022", offers: 75 },
    { year: "2023", offers: 90 },
    { year: "2024", offers: 110 },
    { year: "2025", offers: 130 },
  ];

  // ✅ FIXED — Correct Course Names (Your Requirement)
  const branchPlacementData = [
    { year: 2020, MCS: 120, AIML: 90, "M.TECH": 60, "Msc.cs": 40 },
    { year: 2021, MCS: 140, AIML: 100, "M.TECH": 70, "Msc.cs": 55 },
    { year: 2022, MCS: 160, AIML: 120, "M.TECH": 80, "Msc.cs": 65 },
    { year: 2023, MCS: 180, AIML: 135, "M.TECH": 90, "Msc.cs": 75 },
    { year: 2024, MCS: 200, AIML: 150, "M.TECH": 100, "Msc.cs": 85 },
  ];

  const coursePlacedData = {
    labels: ["CS", "IT", "B.Tech", "MCA", "AIML"],
    datasets: [
      {
        label: "Placed Students",
        data: [120, 100, 80, 60, 40],
        backgroundColor: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const coursePlacedOptions = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "right",
        labels: { color: "#333", font: { size: 14 } },
      },
      tooltip: { enabled: true },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value) => value,
      },
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    StudentService.getStudents()
      .then((response) => {
        const studentsData = response.data;
        setStudents(studentsData);
        setFilteredStudents(studentsData);

        const placed = studentsData.filter((s) => s.placement_status === "placed").length;
        const nonPlaced = studentsData.filter((s) => s.placement_status === "not placed").length;
        const pending = studentsData.filter((s) => s.placement_status === "pending").length;

        setPlacedCount(placed);
        setNonPlacedCount(nonPlaced);
        setPendingCount(pending);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading data...</div>;

  // ------------------------------------------
  // PIE CHART: Placement Overview (Dynamic)
  // ------------------------------------------
  const placementOverviewData = {
    labels: ["Placed", "Not Placed", "Pending"],
    datasets: [
      {
        label: "Students",
        data: [placedCount, nonPlacedCount, pending],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const placementOverviewOptions = {
    plugins: {
      legend: { position: "right" },
      datalabels: { color: "#fff", formatter: (value) => value },
    },
    maintainAspectRatio: false,
  };

  // ----------------------------------------------------------
  // SECTION MODE (Full screen graph)
  // ----------------------------------------------------------
  if (section) {
    return (
      <div className={fullscreen ? "fullscreen-graph" : "graph-box"}>

        {section === "placement" && (
          <GraphPlacement placementOverviewData={placementOverviewData} placementOverviewOptions={placementOverviewOptions} />
        )}

        {section === "package" && <GraphPackage companyData={companyData} />}

        {section === "placedcompany" && <GraphPlacedCompany companyPlacedData={companyPlacedData} />}

        {section === "offers" && <GraphOffers offersPerYearData={offersPerYearData} />}

        {section === "branch" && <GraphBranch branchPlacementData={branchPlacementData} />}

        {section === "course" && (
          <GraphCourse coursePlacedData={coursePlacedData} coursePlacedOptions={coursePlacedOptions} />
        )}

      </div>
    );
  }

  // ----------------------------------------------------------
  // DEFAULT: DASHBOARD (all graphs)
  // ----------------------------------------------------------

  return (
    <div className="analysis-dashboard">

      {/* FILTER */}
      <div className="analysis-filters">
        <AnalysisFilter />
      </div>

      <div className="dashboard-grid">
        <GraphPlacement placementOverviewData={placementOverviewData} placementOverviewOptions={placementOverviewOptions} />
        <GraphPackage companyData={companyData} />
        <GraphPlacedCompany companyPlacedData={companyPlacedData} />
        <GraphOffers offersPerYearData={offersPerYearData} />
        <GraphBranch branchPlacementData={branchPlacementData} />
        <GraphCourse coursePlacedData={coursePlacedData} coursePlacedOptions={coursePlacedOptions} />
      </div>

    </div>
  );
};

// -----------------------------------------------------
// GRAPH COMPONENTS
// -----------------------------------------------------

const GraphPlacement = ({ placementOverviewData, placementOverviewOptions }) => (
  <div className="chart-section">
    <h3>Student Placement Overview</h3>
    <div style={{ width: "50%", height: 400, margin: "auto" }}>
      <Pie data={placementOverviewData} options={placementOverviewOptions} />
    </div>
  </div>
);

const GraphPackage = ({ companyData }) => (
  <div className="chart-section">
    <h3>Average Package by Company (LPA)</h3>
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={companyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <RechartTooltip />
          <RechartLegend />
          <Bar dataKey="package" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const GraphPlacedCompany = ({ companyPlacedData }) => (
  <div className="chart-section">
    <h3>Number of Students Placed per Company</h3>
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={companyPlacedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <RechartTooltip />
          <RechartLegend />
          <Bar dataKey="placed" fill="#82ca9d" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const GraphOffers = ({ offersPerYearData }) => (
  <div className="chart-section">
    <h3>Total Offers per Year</h3>
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <AreaChart data={offersPerYearData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <RechartTooltip />
          <RechartLegend />
          <Area type="monotone" dataKey="offers" stroke="#8884d8" fillOpacity={0.8} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ✅ FIXED FINAL GRAPH (Corrected!)
const GraphBranch = ({ branchPlacementData }) => (
  <div className="chart-section">
    <h3>Course-wise Placement Over Time</h3>
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={branchPlacementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <RechartTooltip />
          <RechartLegend />
          <Line type="monotone" dataKey="MCS" stroke="#4e79a7" strokeWidth={2} />
          <Line type="monotone" dataKey="AIML" stroke="#f28e2b" strokeWidth={2} />
          <Line type="monotone" dataKey="M.TECH" stroke="#e15759" strokeWidth={2} />
          <Line type="monotone" dataKey="Msc.cs" stroke="#76b7b2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const GraphCourse = ({ coursePlacedData, coursePlacedOptions }) => (
  <div className="chart-section">
    <h3>Course-wise Placed Students</h3>
    <div style={{ width: "50%", height: 400, margin: "auto" }}>
      <Pie data={coursePlacedData} options={coursePlacedOptions} />
    </div>
  </div>
);

export default A_AnalysisDashboard;
