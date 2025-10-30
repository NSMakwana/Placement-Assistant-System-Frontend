// src/Pages/Student/CVBuilder.jsx
import React, { useState } from "react";
import CVTemplate1 from "./templates/CVTemplate1";
import "./templates/CVTemplate1.css";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function CVBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    location: "",
    phone: "",
    email: "",
    about: "",
    education: "",
    experience: "",
    skills: "",
    languages: "",
    references: "",
    hobbies: "",
    links: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    } else {
      setPhotoUrl(null);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.getElementById("cv-preview"), {
      callback: function (pdf) {
        pdf.save("CV.pdf");
      },
      x: 20,
      y: 20,
      html2canvas: { scale: 0.57 },
    });
  };

  const downloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun(form.name || ""),
                new TextRun("\n"),
                new TextRun(form.title || ""),
                new TextRun("\n\nAbout:\n" + form.about || ""),
                new TextRun("\n\nEducation:\n" + form.education || ""),
                new TextRun("\n\nExperience:\n" + form.experience || ""),
                new TextRun("\n\nSkills:\n" + form.skills || ""),
                new TextRun("\n\nLanguages:\n" + form.languages || ""),
                new TextRun("\n\nHobbies:\n" + form.hobbies || ""),
                new TextRun("\n\nReferences:\n" + form.references || ""),
                new TextRun("\n\nLinks:\n" + form.links || ""),
              ],
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "CV.docx");
  };

  if (!selectedTemplate) {
    return (
      <div className="template-selection-page">
        <h2>Select CV Template</h2>
        <div className="template-cards">
          <div
            className="template-card"
            onClick={() => setSelectedTemplate("template1")}
          >
            <img
              src={require("../../assets/template1-preview.png")}
              alt="Template 1"
            />
            <p>Template 1</p>
          </div>
          <div className="template-card coming-soon">
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cvbuilder-page">
      <div className="cvbuilder-container">
        {/* Left: Form */}
        <div className="cv-form-column">
          <h2>CV Builder</h2>

          <label>Upload Photo (optional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />

          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />

          <label>About / Profile</label>
          <textarea name="about" rows="4" value={form.about} onChange={handleChange} />

          <label>Education (use new lines)</label>
          <textarea
            name="education"
            rows="5"
            value={form.education}
            onChange={handleChange}
          />

          <label>Experience / Projects (use new lines)</label>
          <textarea
            name="experience"
            rows="5"
            value={form.experience}
            onChange={handleChange}
          />

          <label>Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} />

          <label>Languages (comma separated)</label>
          <input name="languages" value={form.languages} onChange={handleChange} />

          <label>Hobbies (comma separated)</label>
          <input name="hobbies" value={form.hobbies} onChange={handleChange} />

          <label>References / Links</label>
          <textarea
            name="references"
            rows="4"
            value={form.references}
            onChange={handleChange}
          />

          <label>Links</label>
          <input name="links" value={form.links} onChange={handleChange} />

          <div className="download-buttons">
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={downloadWord}>Download Word</button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="cv-preview-column" id="cv-preview">
          <CVTemplate1 data={form} photoUrl={photoUrl} />
        </div>
      </div>
    </div>
  );
}
