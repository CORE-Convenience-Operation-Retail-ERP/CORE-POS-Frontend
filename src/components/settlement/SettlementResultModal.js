import React from "react";

const SettlementResultModal = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  const typeLabelMap = {
    DAILY: "일별",
    SHIFT: "교대",
    MONTHLY: "월별",
    YEARLY: "연별",
  };

  const {
    success,
    date,
    type,
    message,
    totalRevenue,
    discountTotal,
    refundTotal,
    finalAmount,
    transactionCount,
    refundCount,
  } = result;

  const displayType = typeLabelMap[type?.toUpperCase()] || type || "알 수 없음";
  const displayMessage = success
    ? "✔ 정산이 완료되었습니다."
    : `❌ ${message || "정산에 실패했습니다."}`;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={headerStyle}>📊 정산 {success ? "성공" : "실패"}</h2>

        <p
          style={{
            fontSize: "16px",
            color: success ? "#10b981" : "#ef4444",
            fontWeight: "bold",
            marginBottom: "12px",
          }}
        >
          {displayMessage}
        </p>

        <div style={infoStyle}>정산일: {date || "미입력"}</div>
        <div style={infoStyle}>정산유형: {displayType}</div>

        {success && (
          <>
            <div style={infoStyle}>총매출: {(totalRevenue ?? 0).toLocaleString()}원</div>
            <div style={infoStyle}>할인합계: {(discountTotal ?? 0).toLocaleString()}원</div>
            <div style={infoStyle}>환불합계: {(refundTotal ?? 0).toLocaleString()}원</div>
            <div style={infoStyle}>최종금액: {(finalAmount ?? 0).toLocaleString()}원</div>
            <div style={infoStyle}>거래건수: {transactionCount ?? 0}건</div>
            <div style={infoStyle}>환불건수: {refundCount ?? 0}건</div>
          </>
        )}

        <button onClick={onClose} style={buttonStyle}>
          확인
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "16px",
};

const modalStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "360px",
  padding: "24px 20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const headerStyle = {
  fontSize: "20px",
  marginBottom: "16px",
  color: "#111827",
};

const infoStyle = {
  fontSize: "14px",
  marginBottom: "6px",
  color: "#374151",
};

const buttonStyle = {
  marginTop: "20px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "15px",
  cursor: "pointer",
  width: "100%",
};

export default SettlementResultModal;
