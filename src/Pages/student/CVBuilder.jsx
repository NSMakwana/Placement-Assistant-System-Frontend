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

  // ---------------------------
  // FIX: Hidden clone screenshot
  // ---------------------------
  const downloadPDF = () => {
    const original = document.getElementById("cv-preview");
    const clone = original.cloneNode(true);

    const hiddenArea = document.getElementById("cv-capture");
    hiddenArea.innerHTML = "";
    hiddenArea.appendChild(clone);

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const scale = pageWidth / clone.offsetWidth;

    setTimeout(() => {
      pdf.html(clone, {
        callback: (pdf) => pdf.save("CV.pdf"),
        x: 0,
        y: 0,
        width: pageWidth,
        windowWidth: clone.offsetWidth,
        html2canvas: {
          scale,
          useCORS: true,
          allowTaint: true,
        },
      });
    }, 100);
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
                new TextRun("\n\nAbout:\n" + (form.about || "")),
                new TextRun("\n\nEducation:\n" + (form.education || "")),
                new TextRun("\n\nExperience:\n" + (form.experience || "")),
                new TextRun("\n\nSkills:\n" + (form.skills || "")),
                new TextRun("\n\nLanguages:\n" + (form.languages || "")),
                new TextRun("\n\nHobbies:\n" + (form.hobbies || "")),
                new TextRun("\n\nReferences:\n" + (form.references || "")),
                new TextRun("\n\nLinks:\n" + (form.links || "")),
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

        <div className="cv-form-column">
          <h2>CV Builder</h2>

          <label>Upload Photo (optional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />

          {Object.keys(form).map((key) => (
            <div key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>

              {["about", "education", "experience", "references"].includes(key) ? (
                <textarea
                  name={key}
                  rows="4"
                  value={form[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <div className="download-buttons">
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={downloadWord}>Download Word</button>
          </div>
        </div>

        <div className="cv-preview-column" id="cv-preview">
          <CVTemplate1 data={form} photoUrl={photoUrl} />
        </div>
      </div>

      {/* Hidden capture container */}
      <div
        id="cv-capture"
        style={{
          position: "absolute",
          top: "-5000px",
          left: "-5000px",
          zIndex: -1,
        }}
      ></div>
    </div>
  );
}
