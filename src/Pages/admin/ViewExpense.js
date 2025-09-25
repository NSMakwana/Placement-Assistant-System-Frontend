import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewExpense = () => {
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editingItems, setEditingItems] = useState([]);

  // Fetch batches on load
  useEffect(() => {
    axios.get("/api/batches")
      .then(res => setBatches(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch companies by batch
  useEffect(() => {
    if (selectedBatch) {
      axios.get(`/api/companies?batch=${selectedBatch}`)
        .then(res => setCompanies(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedBatch]);

  // Fetch expenses by batch & company
  useEffect(() => {
    if (selectedBatch && selectedCompany) {
      axios.get(`/api/expenses?batch=${selectedBatch}&company=${selectedCompany}`)
        .then(res => setExpenses(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedBatch, selectedCompany]);

  // Edit handlers
  const handleEdit = (expense) => {
    setEditingExpenseId(expense.id);
    setEditingItems(expense.expenses.map(item => ({ ...item }))); // clone items
  };

  const handleAddItem = () => {
    setEditingItems([...editingItems, { description: "", amount: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...editingItems];
    updated.splice(index, 1);
    setEditingItems(updated);
  };

  const handleChangeItem = (index, field, value) => {
    const updated = [...editingItems];
    updated[index][field] = value;
    setEditingItems(updated);
  };

  const handleSave = async () => {
    const total = editingItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    try {
      await axios.put(`/api/expenses/${editingExpenseId}`, { expenses: editingItems, total });
      setExpenses(expenses.map(exp => 
        exp.id === editingExpenseId ? { ...exp, expenses: editingItems, total } : exp
      ));
      setEditingExpenseId(null);
      setEditingItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingExpenseId(null);
    setEditingItems([]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Expenses</h2>

      <label>Batch: </label>
      <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
        <option value="">Select Batch</option>
        {batches.map(batch => <option key={batch} value={batch}>{batch}</option>)}
      </select>

      <label style={{ marginLeft: "15px" }}>Company: </label>
      <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
        <option value="">Select Company</option>
        {companies.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {expenses.length > 0 && (
        <table border="1" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (Rs.)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <React.Fragment key={exp.id}>
                {editingExpenseId === exp.id ? (
                  editingItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={e => handleChangeItem(index, "description", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.amount}
                          onChange={e => handleChangeItem(index, "amount", e.target.value)}
                        />
                      </td>
                      <td>
                        {index === 0 && (
                          <>
                            <button onClick={handleAddItem}>+ Add Item</button>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                          </>
                        )}
                        {index > 0 && (
                          <button onClick={() => handleRemoveItem(index)}>Remove</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  exp.expenses.map((item, i) => (
                    <tr key={i}>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>
                        {i === 0 && (
                          <>
                            <button onClick={() => handleEdit(exp)}>Edit</button>
                            <button onClick={() => handleDelete(exp.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><b>Total</b></td>
              <td colSpan="2">
                <b>{expenses.reduce((sum, exp) => sum + exp.total, 0)} Rs.</b>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      {selectedCompany && expenses.length === 0 && <p>No expenses found.</p>}
    </div>
  );
};

export default ViewExpense;
