import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Expense.css";

function AddExpense({ prefillData, onUpdate }) {
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(prefillData?.batch || "");
  const [selectedCompany, setSelectedCompany] = useState(prefillData?.companyName || "");
  const [billFile, setBillFile] = useState(null);
  const [expenses, setExpenses] = useState(
    prefillData?.expenses || [{ description: "", amount: "" }]
  );
  const [total, setTotal] = useState(prefillData?.total || 0);

  // Fetch batches from backend
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

  // Update total dynamically
  useEffect(() => {
    const newTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    setTotal(newTotal);
  }, [expenses]);

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const addExpenseField = () =>
    setExpenses([...expenses, { description: "", amount: "" }]);

  const removeExpenseField = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedBatch || !selectedCompany) {
      alert("Please select batch and company");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("batch", selectedBatch);
      formData.append("companyName", selectedCompany);

      if (billFile) {
        formData.append("billFile", billFile);
      } else if (!prefillData) {
        alert("Please upload a bill file");
        return;
      }

      // Correctly format expenses: stringified JSON with numeric amounts
      const expensesFormatted = expenses.map(exp => ({
        description: exp.description,
        amount: Number(exp.amount)
      }));
      formData.append("expenses", JSON.stringify(expensesFormatted));
      formData.append("total", total);

      if (prefillData) {
        // Update existing expense
        await axios.put(
          `https://placement-assistant-system.onrender.com/api/expenses/${prefillData.id}`,
          {
            expenses: expensesFormatted,
            total
          }
        );
      } else {
        // Create new expense
        await axios.post(
          "https://placement-assistant-system.onrender.com/api/expenses/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      alert("Expense saved! Total: Rs." + total);
      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert("Error saving expense");
    }
  };

  return (
    <div className="add-expense">
      <div>
        <label>Batch:</label>
        <input
          type="text"
          value={selectedBatch}
          onChange={e => setSelectedBatch(e.target.value)}
          placeholder="Enter batch"
        />
      </div>

      <div>
        <label>Company:</label>
        <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label>Upload Bill:</label>
        <input type="file" onChange={e => setBillFile(e.target.files[0])} />
      </div>

      <div className="expense-items">
        <h3>Expenses</h3>
        {expenses.map((exp, index) => (
          <div key={index} className="expense-item-inline">
            <input
              type="text"
              placeholder="Description"
              value={exp.description}
              onChange={e => handleExpenseChange(index, "description", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={exp.amount}
              onChange={e => handleExpenseChange(index, "amount", e.target.value)}
              required
            />
            <button type="button" onClick={() => removeExpenseField(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-expense-btn" onClick={addExpenseField}>
          Add More
        </button>
      </div>

      <div className="total-display">
        <strong>Total: Rs. {total}</strong>
      </div>

      <button onClick={handleSubmit} className="add-expense-btn">
        Save Expense
      </button>
    </div>
  );
}

export default AddExpense;
