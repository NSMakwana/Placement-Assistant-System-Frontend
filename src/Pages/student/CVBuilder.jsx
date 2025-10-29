// src/pages/student/CVBuilder.jsx
import React, { useState } from "react";
import CVTemplate1 from "./templates/CVTemplate1";
import "./templates/CVTemplate1.css"; // shared CSS for preview style + page layout

export default function CVBuilder() {
  const [form, setForm] = useState({
    name: "Elliot Alderson",
    title: "Computer Science Student",
    location: "New York, USA",
    phone: "+1 123-456-7890",
    email: "elliot.alderson@gmail.com",
    about:
      "A dedicated Computer Science student specializing in Cybersecurity with experience in identifying and mitigating security risks.",
    education:
      "Bachelor of Science in Computer Science — New York University (2022)\nHigh School Diploma — Irving High School (2018)",
    experience:
      "Intern — Allsafe Cybersecurity (May 2020 - Aug 2020)\nFreelance Cybersecurity Consultant (Jun 2019 - Apr 2020)",
    skills: "Cybersecurity, Cryptography, Vulnerability Assessment, Python",
    languages: "English, Spanish, German",
    references:
      "Angela Moss\nAllsafe Cybersecurity\nT: +1 0987654321\nE: angela.moss@allsafe.com",
  });

  const [photoUrl, setPhotoUrl] = useState(null);

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

  return (
    <div className="cvbuilder-page">
      <div className="cvbuilder-container">
        {/* Left: Form */}
        <div className="cv-form-column">
          <h2>CV Builder</h2>

          <label>Photo (optional)</label>
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
          <textarea
            name="about"
            rows="5"
            value={form.about}
            onChange={handleChange}
          />

          <label>Education (new line for each)</label>
          <textarea
            name="education"
            rows="5"
            value={form.education}
            onChange={handleChange}
          />

          <label>Experience / Projects (new line for each)</label>
          <textarea
            name="experience"
            rows="6"
            value={form.experience}
            onChange={handleChange}
          />

          <label>Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} />

          <label>Languages (comma separated)</label>
          <input name="languages" value={form.languages} onChange={handleChange} />

          <label>References / Links / Hobbies</label>
          <textarea
            name="references"
            rows="6"
            value={form.references}
            onChange={handleChange}
          />

          <div style={{ marginTop: 12 }}>
            <small>Tip: Use new lines for separate items in Education / Experience.</small>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="cv-preview-column">
          <CVTemplate1 data={form} photoUrl={photoUrl} />
        </div>
      </div>
    </div>
  );
}
