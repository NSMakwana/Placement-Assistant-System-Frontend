import React, { useState } from "react";
import AddExpense from "./AddExpense";
import ViewExpense from "./ViewExpense";
import "./Expense.css";

function Expense() {
  const [view, setView] = useState("add"); // "add" or "view"

  return (
    <div className="expense-container">
      <h2>Expense Management</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setView("add")}
          style={{
            marginRight: "10px",
            backgroundColor: view === "add" ? "#4CAF50" : "#ddd",
            color: view === "add" ? "white" : "black",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Expense
        </button>

        <button
          onClick={() => setView("view")}
          style={{
            backgroundColor: view === "view" ? "#4CAF50" : "#ddd",
            color: view === "view" ? "white" : "black",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          View Expense
        </button>
      </div>

      <div>
        {view === "add" ? <AddExpense /> : <ViewExpense />}
      </div>
    </div>
  );
}

export default Expense;
