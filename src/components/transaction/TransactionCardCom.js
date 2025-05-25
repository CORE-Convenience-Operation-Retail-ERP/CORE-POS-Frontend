import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cardStyle,
  statusTextStyle,
  detailButtonStyle,
  actionButtonStyle,
  refundBoxStyle,
  refundInputStyle,
  productTableContainer,
  productHeaderRow,
  productRow,
  colFlex,
} from "../../../src/styles/TransactionCardStyle";

const TransactionCardCom = ({ transaction, onRefund }) => {
  const {
    transactionId,
    totalPrice,
    discountTotal,
    finalAmount,
    paymentMethod,
    transactionStatus,
    refundReason,
    refundAmount,
    paidAt,
    refundedAt,
    items,
  } = transaction;

  const productNames = items?.map((item) => item.productName).join(", ") || "상품 정보 없음";

  const [showDetails, setShowDetails] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const isRefunded = transactionStatus === 1;

  const navigate = useNavigate();

  const refundReasons = ["상품 불량", "이중 결제", "결제 금액 오류", "유통기한 임박/초과", "기타"];

  const handleRefundSubmit = () => {
    const reason = selectedReason === "기타" ? customReason : selectedReason;
    if (!reason?.trim()) {
      alert("환불 사유를 입력해주세요.");
      return;
    }
    onRefund(transactionId, reason);
    setShowRefundForm(false);
    setSelectedReason("");
    setCustomReason("");
  };

  return (
    <div className="tx-card" style={cardStyle}>
      <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "15px" }}>📦 거래번호: {transactionId}</div>
      <div style={{ marginBottom: "7px" }}>🛒 상품: {productNames}</div>
      <div style={{ marginBottom: "7px" }}>💳 결제 수단: {paymentMethod?.toUpperCase()}</div>
      <div style={{ marginBottom: "7px", fontWeight: "bold", color: "#1d4ed8" }}>✅ 결제금액: {finalAmount?.toLocaleString()}원</div>
      <div style={{ marginBottom: "10px" }}>📅 결제일시: {paidAt ? new Date(paidAt).toLocaleString() : "N/A"}</div>

      <p style={statusTextStyle(isRefunded)}>
        상태: {isRefunded ? "❌ 환불됨" : "✅ 정상 결제"}
      </p>

      <button onClick={() => setShowDetails((prev) => !prev)} style={detailButtonStyle}>
        {showDetails ? "상세 닫기 🔼" : "상세 보기 🔽"}
      </button>

      {showDetails && (
        <div style={{ marginBottom: "20px" }}>
          <p>📦 상품 목록:</p>
          <div style={productTableContainer}>
            <div style={productHeaderRow}>
              <div style={colFlex(2)}>상품명</div>
              <div style={colFlex(1, "right")}>수량</div>
              <div style={colFlex(1, "right")}>할인</div>
              <div style={colFlex(1, "right")}>결제</div>
            </div>
            {items?.map((item, index) => (
              <div key={index} style={productRow}>
                <div style={colFlex(2)}>{item.productName}</div>
                <div style={colFlex(1, "right")}>{item.salesQuantity}개</div>
                <div style={colFlex(1, "right")}>{item.discountPrice?.toLocaleString()}원</div>
                <div style={colFlex(1, "right")}>{item.finalAmount?.toLocaleString()}원</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isRefunded && (
        <div style={{ marginBottom: "10px", fontSize: "13px", color: "#444" }}>
          <p>📝 환불사유: {refundReason || "없음"}</p>
          <p>↩️ 환불금액: {refundAmount?.toLocaleString()}원</p>
          <p>📆 환불일시: {refundedAt ? new Date(refundedAt).toLocaleString() : "미기록"}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        {!isRefunded && !showRefundForm && (
          <button onClick={() => setShowRefundForm(true)} style={actionButtonStyle("#ef4444")}>
            🔁 환불하기
          </button>
        )}

        <button onClick={() => navigate(`/pos/receipt/${transactionId}`)} style={actionButtonStyle()}>
          🧾 영수증
        </button>
      </div>

      {!isRefunded && showRefundForm && (
        <div style={refundBoxStyle}>
          <label style={{ fontWeight: "bold" }}>📝 환불 사유:</label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            style={{ marginTop: "6px", width: "100%", padding: "6px" }}
          >
            <option value="">사유 선택</option>
            {refundReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          {selectedReason === "기타" && (
            <input
              type="text"
              placeholder="기타 사유 입력"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              style={refundInputStyle}
            />
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={handleRefundSubmit} style={actionButtonStyle("#ef4444")}>환불 확정</button>
            <button onClick={() => setShowRefundForm(false)} style={actionButtonStyle("#ccc")}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCardCom;
