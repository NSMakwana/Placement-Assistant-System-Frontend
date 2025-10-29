// src/pages/CVBuilder/CVForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function CVForm({ templateId, initialData, onBack, onPreview }) {
  const [data, setData] = useState(initialData || {
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    twitter: "",
    skills: "",       // comma-separated
    languages: "",    // comma-separated
    hobbies: "",      // comma-separated
    education: "",    // newline-separated or JSON as you prefer
    experience: "",
    references: "",
  });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const payload = {
        studentEmail: user.email || data.email,
        templateId,
        data
      };
      await axios.post("https://placement-assistant-system.onrender.com/api/student/cv", payload);
      alert("CV saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save CV");
    }
  };

  return (
    <div className="cv-form-page">
      <button className="back-btn" onClick={onBack}>← Back to templates</button>
      <h2>Fill CV Details</h2>
      <div className="cv-form-grid">
        <div>
          <label>Name</label>
          <input name="name" value={data.name} onChange={handleChange} />
        </div>
        <div>
          <label>Title (e.g. Computer Science Student)</label>
          <input name="title" value={data.title} onChange={handleChange} />
        </div>
        <div>
          <label>About</label>
          <textarea name="about" value={data.about} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input name="email" value={data.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={data.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input name="address" value={data.address} onChange={handleChange} />
        </div>

        <div>
          <label>LinkedIn</label>
          <input name="linkedin" value={data.linkedin} onChange={handleChange} />
        </div>
        <div>
          <label>Twitter</label>
          <input name="twitter" value={data.twitter} onChange={handleChange} />
        </div>

        <div>
          <label>Skills (comma separated)</label>
          <input name="skills" value={data.skills} onChange={handleChange} />
        </div>

        <div>
          <label>Languages (comma separated)</label>
          <input name="languages" value={data.languages} onChange={handleChange} />
        </div>

        <div>
          <label>Hobbies (comma separated)</label>
          <input name="hobbies" value={data.hobbies} onChange={handleChange} />
        </div>

        <div className="full">
          <label>Education (each line is one item)</label>
          <textarea name="education" value={data.education} onChange={handleChange} rows={4} />
        </div>

        <div className="full">
          <label>Experience (each line / bullet)</label>
          <textarea name="experience" value={data.experience} onChange={handleChange} rows={6} />
        </div>

        <div className="full">
          <label>References</label>
          <textarea name="references" value={data.references} onChange={handleChange} rows={3} />
        </div>
      </div>

      <div className="cv-form-actions">
        <button onClick={() => onPreview(data)}>Preview</button>
        <button onClick={handleSave}>Save CV</button>
        <button onClick={() => {
          // Quick download via frontend (html2canvas + jspdf) handled in the preview component
          onPreview(data);
        }}>Preview & Download</button>
      </div>
    </div>
  );
}
