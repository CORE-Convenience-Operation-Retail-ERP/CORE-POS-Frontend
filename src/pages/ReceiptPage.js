import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReceipt } from "../services/ReceiptService";
import Barcode from "react-barcode";
import "../styles/ReceiptPage.css";

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
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

  if (!receipt)
    return <div style={{ textAlign: "center", marginTop: "40px" }}>영수증을 불러오는 중...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* 닫기 버튼 */}
      <button
        onClick={() => navigate("/pos/order")}
        className="print-hidden"
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          fontSize: "18px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        ✕
      </button>

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
          결제일시 : {new Date(receipt.paidAt).toLocaleDateString("ko-KR")}<br />
          결제시간 : {new Date(receipt.paidAt).toLocaleTimeString("ko-KR")}
        </p>
        <p>결제수단 : {receipt.paymentMethod === "CARD" ? "카드" : "현금"}</p>

        <hr />

        {/* 환불 규정 */}
        <p style={{ fontSize: "11px", color: "#444", marginBottom: "6px" }}>
          * 정부방침에 의해 교환/환불은 반드시 영수증을 지참하셔야 하며,<br />
          <span style={{ fontWeight: "bold" }}>
            카드결제는 30일이내 카드와 영수증 지참 시 가능합니다.
          </span>
        </p>

        <hr />

        {/* 상품 목록 */}
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

        {/* 금액 요약 */}
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
          </>
        )}

        <hr />

        {/* 현금영수증 정보 */}
        {receipt.cashReceipt && (
          <p style={{ fontSize: "12px", marginBottom: "4px" }}>
            현금영수증 : {receipt.cashReceipt.type} ({receipt.cashReceipt.identity})
          </p>
        )}

        {/* QR 안내 문구 및 이미지 */}
        <hr />
        <p style={{ textAlign: "center", fontSize: "12px", marginBottom: "4px" }}>
          궁금한 점, 불편한 점, 칭찬하고 싶으신 점이 있다면<br />
          QR을 통해 의견 남겨주세요!
        </p>
        <img
          src="/qr.png"
          alt="만족도 조사 QR"
          style={{ width: "160px", display: "block", margin: "0 auto 12px" }}
        />

        {/* 바코드 표시 */}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <Barcode value={receipt.transactionId.toString()} width={1.8} height={40} displayValue={false} />
        </div>

        <div style={{ textAlign: "center", fontSize: "11px", color: "#555", marginTop: "10px", marginBottom: "10px" }}>
          감사합니다. 또 방문해주세요!
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
