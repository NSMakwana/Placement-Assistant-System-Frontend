// src/pages/CVBuilder/index.jsx
import React, { useState } from "react";
import TemplateSelection from "./TemplateSelection";
import CVForm from "./CVForm";
import CVTemplate1 from "./CVTemplate1";
import "./CVBuilder.css";

export default function CVBuilderPage() {
  const [step, setStep] = useState("select"); // select -> form -> preview
  const [templateId, setTemplateId] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="cv-builder-page">
      {step === "select" && (
        <TemplateSelection
          onSelect={(id) => { setTemplateId(id); setStep("form"); }}
        />
      )}

      {step === "form" && (
        <CVForm
          templateId={templateId}
          initialData={formData}
          onBack={() => setStep("select")}
          onPreview={(data) => { setFormData(data); setStep("preview"); }}
        />
      )}

      {step === "preview" && (
        <div>
          <button className="back-btn" onClick={() => setStep("form")}>← Edit</button>
          {templateId === 1 && <CVTemplate1 data={formData} />}
        </div>
      )}
    </div>
  );
}
