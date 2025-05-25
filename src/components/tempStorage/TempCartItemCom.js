import React from "react";

const TempCartItemCom = ({ item, onRestore, onDelete }) => {
  const { id, savedAt, cart } = item;

  const totalQuantity = Object.values(cart).reduce(
    (sum, product) => sum + (product.quantity || 0),
    0
  );

  const totalPrice = Object.values(cart).reduce(
    (sum, product) => sum + (product.quantity || 0) * (product.price || 0),
    0
  );

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "12px",
      backgroundColor: "#fff"
    }}>
      <p><strong>🕓 저장 시간:</strong> {new Date(savedAt).toLocaleString()}</p>
      <p>🛒 상품 수: {totalQuantity}개</p>
      <p>💰 총 금액: {totalPrice.toLocaleString()}원</p>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
        <button
          onClick={() => onRestore(id)}
          style={{ padding: "6px 12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}
        >
          🔄 복원하기
        </button>
        <button
          onClick={() => onDelete(id)}
          style={{ padding: "6px 12px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px" }}
        >
          🗑 삭제
        </button>
      </div>
    </div>
  );
};

export default TempCartItemCom;
