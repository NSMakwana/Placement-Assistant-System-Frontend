// src/pages/student/templates/CVTemplate1.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function CVTemplate1({ data, photoUrl }) {
  if (!data) return null;

  // helpers
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

  return (
    <div className="cv-template-wrap">
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
          <h4 className="left-heading">LINKS</h4>
          <p className="left-text">
            {/* you can expand to clickable links */}
            {data.email}
          </p>
        </div>

        <div className="divider-left" />

        <div className="cv-left-section">
          <h4 className="left-heading">REFERENCE</h4>
          {references.map((r, i) => (
            <p className="left-text" key={i}>
              {r}
            </p>
          ))}
        </div>

        <div className="divider-left" />

        <div className="cv-left-section">
          <h4 className="left-heading">HOBBIES</h4>
          <ul className="left-list">
            <li>Hacking</li>
            <li>Coding</li>
            <li>Reading Cybersecurity Journals</li>
            <li>Chess</li>
            <li>Basketball</li>
          </ul>
        </div>
      </div>

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

        <hr className="thin-hr" />

        <section className="cv-section">
          <h3 className="section-title">WORK EXPERIENCE</h3>
          <div className="timeline">
            {experience.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-left">
                  {/* If you want to split company/date, parse accordingly; here we show the line */}
                </div>
                <div className="timeline-right">
                  <p className="timeline-text">• {e}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h3 className="section-title">EDUCATION</h3>
          {education.map((ed, i) => (
            <p key={i} className="standard-text">
              • {ed}
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h3 className="section-title">SKILLS</h3>
          <div className="skills-list">
            {skills.map((s, i) => (
              <span className="skill-pill" key={i}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h3 className="section-title">LANGUAGES</h3>
          <div className="languages-grid">
            {languages.map((l, i) => (
              <div key={i} className="language-row">
                <div className="language-name">{l}</div>
                <div className="language-bar">
                  <div className="language-level" style={{ width: `${60 + (i * 10)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
