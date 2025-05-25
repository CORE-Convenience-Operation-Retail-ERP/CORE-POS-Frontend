import React from "react";

const PaymentTabsCom = ({ paymentType, setPaymentType }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
      <button
        onClick={() => setPaymentType("CARD")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: paymentType === "CARD" ? "2px solid #3b82f6" : "1px solid #ccc",
          backgroundColor: paymentType === "CARD" ? "#e0f0ff" : "white",
          fontWeight: paymentType === "CARD" ? "bold" : "normal",
          cursor: "pointer"
        }}
      >
        💳 카드 결제
      </button>

      <button
        onClick={() => setPaymentType("CASH")}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: paymentType === "CASH" ? "2px solid #3b82f6" : "1px solid #ccc",
          backgroundColor: paymentType === "CASH" ? "#e0f0ff" : "white",
          fontWeight: paymentType === "CASH" ? "bold" : "normal",
          cursor: "pointer"
        }}
      >
        💵 현금 결제
      </button>
    </div>
  );
};

export default PaymentTabsCom;