import React from "react";
import TransactionListCon from "../containers/payment/TransactionListCon";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button
          onClick={() => navigate("/pos/settlement")}
          style={{
            backgroundColor: "#3f3f3f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          📊 정산 관리
        </button>
      </div>

      {/* 거래 내역 목록 */}
      <TransactionListCon />
    </div>
  );
};

export default TransactionPage;
