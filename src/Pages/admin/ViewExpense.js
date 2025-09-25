import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewExpense = () => {
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Fetch batches on load
  useEffect(() => {
    axios.get("/api/batches")
      .then(res => setBatches(res.data))
      .catch(err => console.error("Error fetching batches:", err));
  }, []);

  // Fetch companies when batch is selected
  useEffect(() => {
    if (selectedBatch) {
      axios.get(`/api/companies?batch=${selectedBatch}`)
        .then(res => setCompanies(res.data))
        .catch(err => console.error("Error fetching companies:", err));
    }
  }, [selectedBatch]);

  // Fetch expenses when company is selected
  useEffect(() => {
    if (selectedBatch && selectedCompany) {
      axios.get(`/api/expenses?batch=${selectedBatch}&company=${selectedCompany}`)
        .then(res => setExpenses(res.data))
        .catch(err => console.error("Error fetching expenses:", err));
    }
  }, [selectedBatch, selectedCompany]);

  // Handle Delete
  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`/api/expenses/${expenseId}`);
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Handle Edit
  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
  };

  // Save Edit
  const handleSave = async () => {
    try {
      const updatedExpense = {
        ...expenses.find(exp => exp.id === editingExpense),
        description: editDescription,
        amount: Number(editAmount)
      };
      await axios.put(`/api/expenses/${editingExpense}`, updatedExpense);

      setExpenses(expenses.map(exp => exp.id === editingExpense ? updatedExpense : exp));
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingExpense(null);
  };

  // Calculate total
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Expenses</h2>

      {/* Batch Selection */}
      <label>Batch: </label>
      <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
        <option value="">Select Batch</option>
        {batches.map((batch) => (
          <option key={batch} value={batch}>{batch}</option>
        ))}
      </select>

      {/* Company Selection */}
      <label style={{ marginLeft: "15px" }}>Company: </label>
      <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>

      {/* Expenses Table */}
      {expenses.length > 0 ? (
        <table border="1" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (Rs.)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>
                  {editingExpense === exp.id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    exp.description
                  )}
                </td>
                <td>
                  {editingExpense === exp.id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  ) : (
                    exp.amount
                  )}
                </td>
                <td>
                  {editingExpense === exp.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(exp)}>Edit</button>
                      <button onClick={() => handleDelete(exp.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><b>Total</b></td>
              <td colSpan="2"><b>{total} Rs.</b></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        selectedCompany && <p>No expenses found for this company.</p>
      )}
    </div>
  );
};

export default ViewExpense;
