const TransactionListCardCom = ({ transaction, onRefund }) => {
    const {
      transactionId, storeId, empId, totalPrice, discountTotal, finalAmount,
      paymentMethod, isRefunded, refundReason, paidAt, refundedAt, } = transaction;
  
    const productNames = transaction.items?.map(item => item.name).join(", ") || "상품 정보 없음";
  
    const handleRefundClick = () => {
      const reason = prompt("환불 사유를 입력해주세요:");
      if (reason) {
        onRefund(transactionId, reason);
      }
    };
  
    return (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        <h4>📦 거래번호: {transactionId}</h4>
        <p>🏪 매장 ID: {storeId}</p>
        <p>👤 점원 ID: {empId}</p>
        <p>🛒 상품: {productNames}</p>
        <p>💳 결제 수단: {paymentMethod}</p>
        <p>💸 총금액: {totalPrice?.toLocaleString()}원</p>
        <p>🧾 할인금액: {discountTotal?.toLocaleString()}원</p>
        <p>✅ 결제금액: {finalAmount?.toLocaleString()}원</p>
        <p>📅 결제일시: {paidAt ? new Date(paidAt).toLocaleString() : "N/A"}</p>
  
        <p style={{
          color: isRefunded ? "red" : "green",
          fontWeight: "bold",
          marginTop: "10px"
        }}>
          상태: {isRefunded ? "❌ 환불됨" : "✅ 정상 결제"}
        </p>
  
        {isRefunded && (
          <>
            <p>📝 환불사유: {refundReason || "없음"}</p>
            <p>↩️ 환불일시: {refundedAt ? new Date(refundedAt).toLocaleString() : "미기록"}</p>
          </>
        )}
  
        {!isRefunded && (
          <button
            onClick={handleRefundClick}
            style={{
              marginTop: "12px",
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: "10px 16px",
              fontSize: "14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            🔁 환불하기
          </button>
        )}
      </div>
    );
  };
  
  export default TransactionListCardCom;
  