// src/pages/CVBuilder/CVTemplate1.jsx
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./CVBuilder.css";


export default function CVTemplate1({ data }) {
  const [photo, setPhoto] = useState(data.photo || null);

  const fillArray = (str) =>
    str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const handleDownload = async () => {
    const element = document.getElementById("cv-preview-1");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${(data.name || "MyCV").replace(/\s+/g, "_")}.pdf`);
  };

  useEffect(() => {}, [data]);

  const skills = fillArray(data.skills);
  const languages = fillArray(data.languages);
  const hobbies = fillArray(data.hobbies);
  const education = (data.education || "").split("\n").filter(Boolean);
  const experience = (data.experience || "").split("\n").filter(Boolean);

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <div className="download-area">
        <button onClick={handleDownload}>Download PDF</button>
      </div>

      <div id="cv-preview-1" className="cv-template-1 bordered-cv">
        {/* === Top Header with photo and contact info === */}
        <div className="cv-header">
          <div className="cv-photo-section">
            {photo ? (
              <img src={photo} alt="profile" className="cv-photo" />
            ) : (
              <div className="cv-photo-placeholder">Upload Photo</div>
            )}
            <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <div className="cv-info">
            <h1>{data.name || "Full Name"}</h1>
            <div className="cv-contact-icons">
              <p><FaMapMarkerAlt /> {data.location || "Location"}</p>
              <p><FaPhoneAlt /> {data.phone || "Phone"}</p>
              <p><FaEnvelope /> {data.email || "Email"}</p>
            </div>
          </div>
        </div>

        <div className="cv-body">
          <aside className="cv-left">
            <section>
              <h4>ABOUT</h4>
              <p>{data.about || "Short description about yourself."}</p>
            </section>

            <section>
              <h4>HOBBIES</h4>
              <ul>
                {hobbies.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          </aside>

          <main className="cv-right">
            <section>
              <h3>WORK EXPERIENCE</h3>
              {experience.length
                ? experience.map((exp, i) => <p key={i}>• {exp}</p>)
                : <p>—</p>}
            </section>

            <section>
              <h3>EDUCATION</h3>
              {education.length
                ? education.map((ed, i) => <p key={i}>• {ed}</p>)
                : <p>—</p>}
            </section>

            <section>
              <h3>SKILLS</h3>
              <div className="skills-grid">
                {skills.map((s, i) => <span key={i} className="skill-pill">{s}</span>)}
              </div>
            </section>

            <section>
              <h3>LANGUAGES</h3>
              <div className="languages-row">
                {languages.map((l, i) => <span key={i}>{l}</span>)}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
