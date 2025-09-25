import React, { useState, useEffect } from "react";
import axios from "axios";

function Expense() {
  const [view, setView] = useState("add"); // "add" or "view"
  const [batch, setBatch] = useState("");
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [billFile, setBillFile] = useState(null);
  const [expenses, setExpenses] = useState([{ description: "", amount: "" }]);
  const [tableData, setTableData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null); // expense being edited

  // Fetch companies by batch
  useEffect(() => {
    if (batch) {
      axios.get(`/api/companies/batch/${batch}`).then((res) => {
        setCompanies(res.data);
      });
    }
  }, [batch]);

  // Handle add/remove expense rows
  const addExpenseRow = () => {
    setExpenses([...expenses, { description: "", amount: "" }]);
  };

  const removeExpenseRow = (index) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  };

  // Save new expense
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("batch", batch);
    formData.append("companyName", company);
    formData.append("billFile", billFile);
    formData.append("expenses", JSON.stringify(expenses));
    formData.append("total", calculateTotal());

    await axios.post("/api/expenses/upload", formData);
    alert("Expense saved!");
    setExpenses([{ description: "", amount: "" }]);
    setBillFile(null);
  };

  // Fetch expenses for table
  const fetchTable = async () => {
    const res = await axios.get(
      `/api/expenses/filter?batch=${batch}&companyName=${company}`
    );
    setTableData(res.data);
  };

  // Delete expense entry
  const handleDelete = async (id) => {
    await axios.delete(`/api/expenses/${id}`);
    fetchTable();
  };

  // Start editing
  const handleEdit = (exp) => {
    setEditingExpense(exp);
    setExpenses(exp.expenses); // load rows into form
    setView("edit");
  };

  // Save edited expense
  const handleUpdate = async () => {
    const updated = {
      expenses,
      total: calculateTotal(),
    };
    await axios.put(`/api/expenses/${editingExpense.id}`, updated);
    alert("Expense updated!");
    setEditingExpense(null);
    setView("view");
    fetchTable();
  };

  return (
    <div>
      <h2>Expense Management</h2>
      <button onClick={() => setView("add")}>Add Expense</button>
      <button onClick={() => setView("view")}>View Expense</button>

      {/* Add Expense Form */}
      {view === "add" && (
        <div>
          <select onChange={(e) => setBatch(e.target.value)} value={batch}>
            <option value="">Select Batch</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          {batch && (
            <select onChange={(e) => setCompany(e.target.value)} value={company}>
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <input type="file" onChange={(e) => setBillFile(e.target.files[0])} />

          {expenses.map((exp, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleChange(i, "description", e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={exp.amount}
                onChange={(e) => handleChange(i, "amount", e.target.value)}
              />
              {i > 0 && (
                <button onClick={() => removeExpenseRow(i)}>Remove</button>
              )}
            </div>
          ))}

          <button onClick={addExpenseRow}>+ Add Expense</button>

          <h3>Total: {calculateTotal()}</h3>

          <button onClick={handleSubmit}>Save Expense</button>
        </div>
      )}

      {/* View Expenses */}
      {view === "view" && (
        <div>
          <select onChange={(e) => setBatch(e.target.value)} value={batch}>
            <option value="">Select Batch</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          {batch && (
            <select onChange={(e) => setCompany(e.target.value)} value={company}>
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <button onClick={fetchTable}>View</button>

          <table border="1">
            <thead>
              <tr>
                <th>Total</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((exp) =>
                exp.expenses.map((e, i) => (
                  <tr key={i}>
                    <td>{exp.total}</td>
                    <td>{e.description}</td>
                    <td>{e.amount}</td>
                    <td>
                      <button onClick={() => handleEdit(exp)}>Edit</button>
                      <button onClick={() => handleDelete(exp.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Expenses */}
      {view === "edit" && (
        <div>
          <h3>Edit Expense</h3>
          {expenses.map((exp, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleChange(i, "description", e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={exp.amount}
                onChange={(e) => handleChange(i, "amount", e.target.value)}
              />
              {i > 0 && (
                <button onClick={() => removeExpenseRow(i)}>Remove</button>
              )}
            </div>
          ))}
          <button onClick={addExpenseRow}>+ Add Expense</button>
          <h3>Total: {calculateTotal()}</h3>
          <button onClick={handleUpdate}>Update Expense</button>
          <button onClick={() => setView("view")}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Expense;
