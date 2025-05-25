import React, { useState } from "react";
import { format } from "date-fns";

const TransactionFilterModal = ({
  onApply,
  onClose,
  defaultFrom,
  defaultTo,
}) => {
  const [rangeType, setRangeType] = useState("all");
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);

  const handleSubmit = () => {
    if (rangeType === "custom" && (!fromDate || !toDate)) {
      alert("날짜를 선택해주세요.");
      return;
    }
    onApply(rangeType, fromDate, toDate);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        padding: "0 12px", // 여백 줄임
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px 14px", // 패딩 줄임
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "440px", // 💡 조금 더 줄임
          position: "relative",
        }}
      >
        {/* 제목 */}
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          📆 거래 필터 설정
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            color: "#999",
            cursor: "pointer",
          }}
          title="닫기"
        >
          ✕
        </button>

        {/* 라디오 */}
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            <input
              type="radio"
              value="all"
              checked={rangeType === "all"}
              onChange={() => setRangeType("all")}
              style={{ marginRight: "6px" }}
            />
            전체 보기
          </label>

          <label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            <input
              type="radio"
              value="custom"
              checked={rangeType === "custom"}
              onChange={() => setRangeType("custom")}
              style={{ marginRight: "6px" }}
            />
            날짜 선택
          </label>
        </div>

        {/* 날짜 선택 */}
        {rangeType === "custom" && (
          <div
            style={{
              display: "flex",
              gap: "35px",
              marginBottom: 20,
              justifyContent: "flex-start",
            }}
          >
            <div style={{ flex: 0.45 }}>
              <label
                style={{
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "4px",
                  color: "#444",
                }}
              >
                
              </label>
              <input
                type="date"
                value={format(fromDate, "yyyy-MM-dd")}
                onChange={(e) => setFromDate(new Date(e.target.value))}
                style={{
                  width: "180px", 
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
            <div style={{ flex: 0.45 }}>
              <label
                style={{
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "4px",
                  color: "#444",
                }}
              >
              
              </label>
              <input
                type="date"
                value={format(toDate, "yyyy-MM-dd")}
                onChange={(e) => setToDate(new Date(e.target.value))}
                style={{
                  width: "180px", 
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        )}

        {/* 적용 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default TransactionFilterModal;
