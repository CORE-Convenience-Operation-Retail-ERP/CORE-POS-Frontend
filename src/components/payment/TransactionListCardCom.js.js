const TransactionListCardCom = ({ transaction, onRefund }) => {
    const {
      transactionId, totalPrice, discountTotal, finalAmount,
      paymentMethod, isRefunded, refundReason, paidAt, refundedAt, items } = transaction;
  
    const productNames = transaction.items?.map(item => item.name).join(", ") || "상품 정보 없음";
    const [showDetails, setShowDetails] = useState(false);

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

    {/* 상세 보기 토글 */}
    <button onClick={() => setShowDetails(prev => !prev)}
        style={{
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
  
    {/*  환불 정보 */}
    {isRefunded === 1 && (
        <div style={{ marginTop: "10px" }}>
          <p>📝 환불사유: {refundReason || "없음"}</p>
          <p>↩️ 환불일시: {refundedAt ? new Date(refundedAt).toLocaleString() : "미기록"}</p>
        </div>
    )}
  
    {/* 환불 버튼 (환불 안 된 건만) */}
    {isRefunded !== 1 && (
    <button onClick={handleRefundClick}
        style={{
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
    </div>
    );
  };
  
  export default TransactionListCardCom;
  