import React, { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";

function ViewExpense() {
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [expensesData, setExpensesData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Fetch batches from CompanyController
  useEffect(() => {
    axios.get("https://placement-assistant-system.onrender.com/api/companies")
      .then(res => {
        const uniqueBatches = [...new Set(res.data.map(c => c.batch))];
        setBatches(uniqueBatches);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch companies for selected batch
  useEffect(() => {
    if (selectedBatch) {
      axios.get(`https://placement-assistant-system.onrender.com/api/companies/batch/${selectedBatch}`)
        .then(res => setCompanies(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedBatch]);

  // Fetch expenses for selected batch & company
  const fetchExpenses = () => {
    if (selectedBatch && selectedCompany) {
      axios.get(`https://placement-assistant-system.onrender.com/api/expenses/${selectedBatch}/${selectedCompany}`)
        .then(res => setExpensesData(res.data))
        .catch(err => console.error(err));
    }
  };

  // Delete expense
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      axios.delete(`https://placement-assistant-system.onrender.com/api/expenses/${id}`)
        .then(() => fetchExpenses())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="view-expense">
      <h2>View Expenses</h2>

      <div>
        <label>Batch:</label>
        <input
          type="text"
          value={selectedBatch}
          onChange={e => setSelectedBatch(e.target.value)}
          placeholder="Enter batch"
        />
      </div>


      <div className="form-group">
        <label>Company:</label>
        <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button onClick={fetchExpenses}>View Expenses</button>

      {expensesData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map(exp => (
              <tr key={exp.id}>
                <td>{exp.expenses.map(e => e.description).join(", ")}</td>
                <td>{exp.expenses.map(e => e.amount).join(", ")}</td>
                <td>{exp.total}</td>
                <td>
                  <button onClick={() => setSelectedExpense(exp)}>Edit</button>
                  <button onClick={() => handleDelete(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Inline Edit Section */}
      {selectedExpense && (
        <div className="edit-expense-section">
          <h3>Edit Expense: {selectedExpense.companyName} - {selectedExpense.batch}</h3>
          <AddExpense
            prefillData={selectedExpense}
            onUpdate={() => {
              fetchExpenses();
              setSelectedExpense(null);
            }}
          />
          <button onClick={() => setSelectedExpense(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ViewExpense;
