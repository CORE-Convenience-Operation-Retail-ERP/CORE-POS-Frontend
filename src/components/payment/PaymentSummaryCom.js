const PaymentSummaryCom = ({ cart }) => {
  const items = Object.values(cart);

  // 할인 계산 로직 분리
  const calculateDiscount = (item) => {
    const { price = 0, quantity = 0, isPromo = 0 } = item;

    if (isPromo === 2) {
      // 1+1: 하나 무료
      return Math.floor(quantity / 2) * price;
    }

    if (isPromo === 3) {
      // 2+1: 3개 중 1개 무료
      return Math.floor(quantity / 3) * price;
    }

    return 0;
  };

  // 총 정가 (할인 전 가격)
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  // 총 할인 금액
  const totalDiscount = items.reduce(
    (sum, item) => sum + calculateDiscount(item),
    0
  );

  // 최종 결제 금액
  const finalAmount = totalPrice - totalDiscount;

  return (
    <div style={{ marginTop: '16px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h4>💳 결제 요약</h4>
      <p>총 상품 금액: {totalPrice.toLocaleString()}원</p>
      {totalDiscount > 0 && (
        <p style={{ color: 'green' }}>
          총 할인 금액: -{totalDiscount.toLocaleString()}원
        </p>
      )}
      <p><strong>최종 결제 금액: {finalAmount.toLocaleString()}원</strong></p>

      {/* 추가: 어떤 항목에 얼마나 할인됐는지 개별 표시 */}
      {items.map((item) => {
        const discount = calculateDiscount(item);
        if (discount > 0) {
          return (
            <p key={item.productId} style={{ fontSize: "13px", marginLeft: "10px", color: "#555" }}>
              👉 <strong>{item.name}</strong> 프로모션 적용 할인: -{discount.toLocaleString()}원
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PaymentSummaryCom;
