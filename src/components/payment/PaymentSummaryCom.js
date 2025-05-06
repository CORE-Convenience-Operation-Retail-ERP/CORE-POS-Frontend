const PaymentSummaryCom = ({ cart }) => {
  const items = Object.values(cart);

  // 총 정가 (할인 전 가격)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 총 할인 (프로모션 적용된 경우)
  const totalDiscount = items.reduce((sum, item) => {
    let discount = 0;
    if (item.isPromo === 2) {
      // 1+1 : 2개 중 1개 무료 → 수량이 2 이상일 때만 할인 적용
      discount = Math.floor(item.quantity / 2) * item.price;
    } else if (item.isPromo === 3) {
      // 2+1 : 3개당 1개 무료
      discount = Math.floor(item.quantity / 3) * item.price;
    }
    return sum + discount;
  }, 0);
  

  // 최종 결제 금액 (총 정가 - 할인)
  const finalAmount = totalPrice - totalDiscount;

  return (
    <div style={{ marginTop: '16px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h4>💳 결제 요약</h4>
      <p>총 상품 금액: {totalPrice.toLocaleString()}원</p>
      <p>총 할인 금액: -{totalDiscount.toLocaleString()}원</p>
      <p><strong>최종 결제 금액: {finalAmount.toLocaleString()}원</strong></p>
    </div>
  );
};

export default PaymentSummaryCom;
