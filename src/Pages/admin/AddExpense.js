import React, { useState, useEffect } from "react";
import axios from "axios";

function AddExpense({ prefillData, onUpdate }) {
  const [batches, setBatches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(prefillData?.batch || "");
  const [selectedCompany, setSelectedCompany] = useState(prefillData?.companyName || "");
  const [billFile, setBillFile] = useState(null);
  const [expenses, setExpenses] = useState(prefillData?.expenses || [{ description: "", amount: "" }]);
  const [total, setTotal] = useState(prefillData?.total || 0);

  // Fetch batches from CompanyController
  useEffect(() => {
    axios.get("http://localhost:8080/api/companies")
      .then(res => {
        const uniqueBatches = [...new Set(res.data.map(c => c.batch))];
        setBatches(uniqueBatches);
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch companies for selected batch
  useEffect(() => {
    if (selectedBatch) {
      axios.get(`http://localhost:8080/api/companies/batch/${selectedBatch}`)
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

  const addExpenseField = () => setExpenses([...expenses, { description: "", amount: "" }]);
  const removeExpenseField = (index) => setExpenses(expenses.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!selectedBatch || !selectedCompany) {
      alert("Please select batch and company");
      return;
    }

    const formData = new FormData();
    formData.append("batch", selectedBatch);
    formData.append("companyName", selectedCompany);
    if (billFile) formData.append("billFile", billFile);
    formData.append("expenses", JSON.stringify(expenses));
    formData.append("total", total);

    try {
      if (prefillData) {
        await axios.put(`http://localhost:8080/api/expenses/${prefillData.id}`, {
          expenses,
          total
        });
      } else {
        await axios.post("http://localhost:8080/api/expenses/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
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
        <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map(batch => <option key={batch} value={batch}>{batch}</option>)}
        </select>
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
          <div key={index} className="expense-item">
            <input
              type="text"
              placeholder="Description"
              value={exp.description}
              onChange={e => handleExpenseChange(index, "description", e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={exp.amount}
              onChange={e => handleExpenseChange(index, "amount", e.target.value)}
            />
            <button onClick={() => removeExpenseField(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addExpenseField}>Add More</button>
      </div>

      <div className="total-display">a
        <strong>Total: Rs. {total}</strong>
      </div>

      <button onClick={handleSubmit}>Save Expense</button>
    </div>
  );
}

export default AddExpense;
