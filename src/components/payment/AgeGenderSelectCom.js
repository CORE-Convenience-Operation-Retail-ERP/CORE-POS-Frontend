import React from "react";

const ageOptions = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
const genderOptions = ["남", "여"];

const AgeGenderSelectCom = ({ ageGroup, setAgeGroup, gender, setGender }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
      <div>
        <p style={{ 
          fontWeight: "600", 
          marginBottom: "10px", 
          color: "#334155",
          fontSize: "15px"
        }}>🎂 연령대 선택</p>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          maxWidth: "400px",
          margin: "0 auto"
        }}>
          {ageOptions.map((age) => (
            <button
              key={age}
              onClick={() => setAgeGroup(age)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: ageGroup === age ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                backgroundColor: ageGroup === age ? "#eff6ff" : "white",
                color: ageGroup === age ? "#000000" : "#64748b",
                fontWeight: ageGroup === age ? "600" : "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                boxShadow: ageGroup === age ? "0 2px 4px rgba(59, 130, 246, 0.1)" : "none"
              }}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ 
          fontWeight: "600", 
          marginBottom: "10px", 
          color: "#334155",
          fontSize: "15px"
        }}>🚻 성별 선택</p>
        <div style={{ 
          display: "flex", 
          gap: "8px",
          justifyContent: "center"
        }}>
          {genderOptions.map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                border: gender === g ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                backgroundColor: gender === g ? "#eff6ff" : "white",
                color: gender === g ? "#000000" : "#64748b",
                fontWeight: gender === g ? "600" : "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                minWidth: "80px",
                boxShadow: gender === g ? "0 2px 4px rgba(59, 130, 246, 0.1)" : "none"
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeGenderSelectCom;
