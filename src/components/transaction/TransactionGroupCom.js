import React from "react";
import TransactionCardCom from "./TransactionCardCom";

const TransactionGroupCom = ({ date, transactions, onRefund }) => {
  if (!transactions || transactions.length === 0) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px", fontSize: "18px", color: "#111" }}>
        📅 {date} ({transactions.length}건)
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
        {transactions.map((tx) => (
          <TransactionCardCom key={tx.transactionId} transaction={tx} onRefund={onRefund} />
        ))}
      </div>
    </div>
  );
};

export default TransactionGroupCom;
