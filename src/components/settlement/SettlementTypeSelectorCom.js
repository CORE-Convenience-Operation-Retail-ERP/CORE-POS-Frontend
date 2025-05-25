import React from "react";

const types = [
  { label: "일일", value: "DAILY" },
  { label: "교대", value: "SHIFT" },
  { label: "월별", value: "MONTHLY" },
  { label: "연도별", value: "YEARLY" },
];

const SettlementTypeSelectorCom = ({ selectedType, onTypeChange }) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      {types.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => onTypeChange(value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: selectedType === value ? "2px solid #3b82f6" : "1px solid #ccc",
            backgroundColor: selectedType === value ? "#eff6ff" : "#fff",
            fontWeight: selectedType === value ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SettlementTypeSelectorCom;
