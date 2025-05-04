const PaymentButtonCom = ({ cart }) => {
  const items = Object.values(cart);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    if (items.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    alert(`총 ${totalPrice.toLocaleString()}원을 결제합니다!`);
    // TODO: 결제 요청 로직 추가 예정
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>💰 총합: {totalPrice.toLocaleString()}원</h3>
      <button
        onClick={handlePayment}
        style={{
          marginTop: '20px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          padding: '14px 24px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        💳 결제하기
      </button>
    </div>
  );
};

export default PaymentButtonCom;
