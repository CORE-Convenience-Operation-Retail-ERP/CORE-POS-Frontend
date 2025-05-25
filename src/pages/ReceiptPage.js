import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReceipt } from "../services/ReceiptService";
import "../styles/ReceiptPage.css";

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchReceipt(transactionId);
        setReceipt(res);
      } catch (e) {
        alert("영수증 데이터를 불러오지 못했습니다.");
      }
    };
    load();
  }, [transactionId]);

  if (!receipt) return <div>영수증을 불러오는 중...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        id="receipt-box"
        style={{
          width: "280px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "'Courier New', monospace",
          border: "1px dashed #aaa",
          backgroundColor: "#fff",
          color: "#111",
          textAlign: "left",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "4px" }}>CORE POS</h2>
        <p style={{ textAlign: "center", marginBottom: "2px" }}>영수증</p>
        <p style={{ textAlign: "center", fontSize: "12px", marginBottom: "12px" }}>
          {localStorage.getItem("storeName") || "지점명"} 지점
        </p>

        <p>거래번호 : {receipt.transactionId}</p>
        <p>
          결제일시 : {new Date(receipt.paidAt).toLocaleDateString("ko-KR")}
        </p>
        <p>
          결제시간 : {new Date(receipt.paidAt).toLocaleTimeString("ko-KR")}
        </p>
        <p>결제수단 : {receipt.paymentMethod}</p>

        <hr />

        {receipt.items.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "6px" }}>
            <div>{item.productName}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {item.salesQuantity} x {item.unitPrice?.toLocaleString()} =
              </span>
              <span>{(item.unitPrice * item.salesQuantity).toLocaleString()}원</span>
            </div>
            {item.discountPrice > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                <span>할인 적용</span>
                <span>{item.finalAmount?.toLocaleString()}원</span>
              </div>
            )}
          </div>
        ))}

        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>총  금  액</span>
          <span>{receipt.totalPrice?.toLocaleString()}원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>할        인</span>
          <span>-{receipt.discountTotal?.toLocaleString()}원</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "1.1em",
            marginTop: "10px",
          }}
        >
          <span>결제금액</span>
          <span>{receipt.finalAmount?.toLocaleString()}원</span>
        </div>

        {receipt.transactionStatus === 1 && (
          <>
            <hr />
            <p style={{ color: "red", marginTop: "10px" }}>※ 환불된 거래입니다</p>
            <p>환불 사유: {receipt.refundReason}</p>
            <p>환불 금액: {receipt.refundAmount?.toLocaleString()}원</p>
          </>
        )}

        <hr />
        <div style={{ textAlign: "center", fontSize: "11px", color: "#555" }}>
          감사합니다. 또 방문해주세요!
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            marginTop: "10px",
            letterSpacing: "2px",
          }}
        >
          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="print-hidden"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "1px solid #888",
          backgroundColor: "#f1f1f1",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        🖨️ 인쇄
      </button>
    </div>
  );
};

export default ReceiptPage;
