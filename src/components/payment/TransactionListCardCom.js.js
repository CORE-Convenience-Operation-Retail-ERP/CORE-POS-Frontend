import { useState } from "react";

const TransactionListCardCom = ({ transaction, onRefund }) => {
    const {
      transactionId, totalPrice, discountTotal, finalAmount,
    paymentMethod, transactionStatus, refundReason, refundAmount,
    paidAt, refundedAt, items } = transaction;
  
    const productNames = items?.map(item => item.name).join(", ") || "상품 정보 없음";
    const [showDetails, setShowDetails] = useState(false);
    const [showRefundForm, setShowRefundForm] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const isRefunded = transactionStatus === 1;

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
      <div className="tx-card" style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        minWidth: "260px",
        margin: "10px"
      }}>
        <h4>📦 거래번호: {transactionId}</h4>
        <p>🛒 상품: {productNames}</p>
        <p>💳 결제 수단: {paymentMethod}</p>
        <p>✅ 결제금액: {finalAmount?.toLocaleString()}원</p>
        <p>📅 결제일시: {paidAt ? new Date(paidAt).toLocaleString() : "N/A"}</p>
  
        <p style={{
          color: isRefunded ? "red" : "green",
          fontWeight: "bold",
          marginTop: "10px"
        }}>
          상태: {isRefunded ? "❌ 환불됨" : "✅ 정상 결제"}
        </p>
  
        {/* 상세 토글 */}
        <button onClick={() => setShowDetails(prev => !prev)} style={{
          marginTop: "10px",
          backgroundColor: "#f3f4f6",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
          fontSize: "14px"
        }}>
          {showDetails ? "상세 닫기 🔼" : "상세 보기 🔽"}
        </button>
  
        {showDetails && (
          <div style={{ marginTop: "10px" }}>
            <p>💸 총금액: {totalPrice?.toLocaleString()}원</p>
            <p>🧾 할인금액: {discountTotal?.toLocaleString()}원</p>
            <p>📦 상품 목록:</p>
            <ul style={{ paddingLeft: "16px" }}>
              {items?.map((item, index) => (
                <li key={index}>
                  {item.name} {item.salesQuantity}개{" "}
                  {item.isPromo === 2 ? "(1+1)" : item.isPromo === 3 ? "(2+1)" : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {/* 환불 정보 */}
        {isRefunded && (
          <div style={{ marginTop: "10px" }}>
            <p>📝 환불사유: {refundReason || "없음"}</p>
            <p>↩️ 환불금액: {refundAmount?.toLocaleString()}원</p>
            <p>📆 환불일시: {refundedAt ? new Date(refundedAt).toLocaleString() : "미기록"}</p>
          </div>
        )}
  
        {/* 환불 버튼 + 폼 */}
      {!isRefunded && (
        <>
          {!showRefundForm && (
            <button onClick={() => setShowRefundForm(true)} style={{
              marginTop: "12px",
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: "10px 16px",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}>
              🔁 환불하기
            </button>
          )}

          {showRefundForm && (
            <div style={{
              marginTop: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              backgroundColor: "#f9f9f9"
            }}>
              <label style={{ fontWeight: "bold" }}>📝 환불 사유:</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{ marginTop: "6px", width: "100%", padding: "6px" }}
              >
                <option value="">사유 선택</option>
                {refundReasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>

              {selectedReason === "기타" && (
                <input
                  type="text"
                  placeholder="기타 사유 입력"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  style={{ marginTop: "8px", width: "100%", padding: "6px" }}
                />
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={handleRefundSubmit} style={{
                  flex: 1,
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  padding: "8px 0",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}>
                  환불 확정
                </button>
                <button onClick={() => setShowRefundForm(false)} style={{
                  flex: 1,
                  backgroundColor: "#ccc",
                  color: "#333",
                  padding: "8px 0",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}>
                  취소
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionListCardCom;