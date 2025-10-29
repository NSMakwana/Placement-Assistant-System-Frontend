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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend as RechartLegend } from "recharts";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const A_AnalysisDashboard = () => {
  const [placedCount, setPlacedCount] = useState(0);
  const [nonPlacedCount, setNonPlacedCount] = useState(0);
  const [pending, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);

  // Company packages data (example, you can fetch from API)
  const companyData = [
    { company: "TechCorp", package: 10 },
    { company: "Mastek", package: 6 },
    { company: "Social Pilot", package: 8 },
    { company: "TCS", package: 7 },
    { company: "Incubyte", package: 9 },
    { company: "Shaip", package: 5 },
  ];

  useEffect(() => {
    StudentService.getStudents()
      .then((response) => {
        const students = response.data;
        setStudents(students);
        setFilteredStudents(students); // Initialize filtered students

        // Calculate initial counts
        const placed = students.filter((s) => s.placement_status === "placed").length;
        const nonPlaced = students.filter((s) => s.placement_status === "not placed").length;
        const pending = students.filter((s) => s.placement_status === "pending").length;

        setPlacedCount(placed);
        setNonPlacedCount(nonPlaced);
        setPendingCount(pending);
      })
      .catch((error) => console.error("Error fetching student data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (key, value) => {
    let filtered = [...students];
    if (key === "clear") {
      setFilteredStudents(students);
      setPlacedCount(students.filter((s) => s.placement_status === "placed").length);
      setNonPlacedCount(students.filter((s) => s.placement_status === "not placed").length);
      setPendingCount(students.filter((s) => s.placement_status === "pending").length);
      return;
    }

    if (key === "batch" && value) filtered = filtered.filter((s) => s.batch === value);
    if (key === "program" && value) filtered = filtered.filter((s) => s.course.toLowerCase() === value.toLowerCase());

    setFilteredStudents(filtered);

    // Update counts
    setPlacedCount(filtered.filter((s) => s.placement_status === "placed").length);
    setNonPlacedCount(filtered.filter((s) => s.placement_status === "not placed").length);
    setPendingCount(filtered.filter((s) => s.placement_status === "pending").length);
  };

  const pieChartData = {
    labels: ["Placed Students", "Non-Placed Students", "Pending"],
    datasets: [
      {
        data: [placedCount, nonPlacedCount, pending],
        backgroundColor: ["#4CAF50", "#FF5252", "purple"],
        hoverBackgroundColor: ["#66BB6A", "#FF867F", "#A020F0"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#ffffff",
        font: { size: 14, weight: "bold" },
        formatter: (value) => `${value}`,
      },
    },
  };

  if (loading) return <div className="loading">Loading data...</div>;

  return (
    <div className="analysis-dashboard">
      {/* Filter Section */}
      <div className="analysis-filters">
        <AnalysisFilter onFilter={handleFilter} />
      </div>

      {/* Student Placement Pie Chart */}
      <div className="chart-section">
        <h3>Student Placement Overview</h3>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>

      {/* Company Packages Bar Chart */}
      <div className="chart-section">
        <h3>Average Package by Company (LPA)</h3>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={companyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" angle={-45} textAnchor="end" interval={0} />
              <YAxis label={{ value: "Package (LPA)", angle: -90, position: "insideLeft" }} />
              <RechartTooltip />
              <RechartLegend />
              <Bar dataKey="package" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default A_AnalysisDashboard;
