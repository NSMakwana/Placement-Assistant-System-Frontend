// src/Pages/Student/templates/CVTemplate1.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function CVTemplate1({ data, photoUrl }) {
  if (!data) return null;

  const listFromNewlines = (s) =>
    (s || "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

  const skills = (data.skills || "").split(",").map((s) => s.trim()).filter(Boolean);
  const languages = (data.languages || "").split(",").map((s) => s.trim()).filter(Boolean);
  const education = listFromNewlines(data.education);
  const experience = listFromNewlines(data.experience);
  const references = listFromNewlines(data.references);
  const hobbies = (data.hobbies || "").split(",").map((h) => h.trim()).filter(Boolean);

  return (
    <div className="cv-template-wrap">
      {/* Left dark panel */}
      <div className="cv-left-dark">
        <div className="cv-photo-wrap">
          {photoUrl ? (
            <img src={photoUrl} alt="profile" className="cv-photo-circle" />
          ) : (
            <div className="cv-photo-placeholder">Photo</div>
          )}
        </div>

        <div className="cv-left-section">
          <h4 className="left-heading">ABOUT ME</h4>
          <p className="left-text">{data.about}</p>
        </div>

        <div className="divider-left" />

        <div className="cv-left-section">
          <h4 className="left-heading">HOBBIES</h4>
          <ul className="left-list">
            {hobbies.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="divider-left" />

        <div className="cv-left-section">
          <h4 className="left-heading">REFERENCES</h4>
          {references.map((r, i) => (
            <p className="left-text" key={i}>
              {r}
            </p>
          ))}
        </div>
      </div>

      {/* Right white panel */}
      <div className="cv-right-white">
        <div className="cv-name-row">
          <div className="cv-name-block">
            <div className="cv-name">{data.name || "Full Name"}</div>
            <div className="cv-subtitle">{data.title || ""}</div>
          </div>

          <div className="cv-contact-block">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div className="contact-text">{data.location}</div>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <div className="contact-text">{data.phone}</div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div className="contact-text">{data.email}</div>
            </div>
          </div>
        </div>

       

        <section className="cv-section">
          <h3 className="section-title">EXPERIENCE</h3>
           <hr className="thin-hr" />
          {experience.map((e, i) => (
            <p key={i} className="standard-text">
              • {e}
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h3 className="section-title">EDUCATION</h3>
           <hr className="thin-hr" />

          {education.map((ed, i) => (
            <p key={i} className="standard-text">
              • {ed}
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h3 className="section-title">SKILLS</h3>
           <hr className="thin-hr" />
          {skills.map((s, i) => (
            <div key={i} className="skill-bar">
              <div className="skill-fill">{s}</div>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h3 className="section-title">LANGUAGES</h3>
           <hr className="thin-hr" />
          {languages.map((l, i) => (
            <div key={i} className="skill-bar">
              <div className="skill-fill">{l}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
