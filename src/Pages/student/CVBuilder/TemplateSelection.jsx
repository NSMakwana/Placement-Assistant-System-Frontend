// src/pages/CVBuilder/TemplateSelection.jsx
import React from "react";

export default function TemplateSelection({ onSelect }) {
  return (
    <div className="template-selection">
      <h2>Select a CV Template</h2>
      <div className="template-cards">
        <div className="template-card" onClick={() => onSelect(1)}>
          <img src="/templates/template1-thumb.png" alt="Template 1" />
          <div className="template-name">Modern — Left Sidebar</div>
        </div>

        <div className="template-card" onClick={() => onSelect(2)}>
          <img src="/templates/template2-thumb.png" alt="Template 2" />
          <div className="template-name">Classic — Single column</div>
        </div>
      </div>
    </div>
  );
}
