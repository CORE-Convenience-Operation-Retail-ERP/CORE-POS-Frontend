import { useNavigate } from "react-router-dom";

const PaymentButtonCom = ({ cart }) => {
  const navigate = useNavigate();
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

    if(!window.IMP) {
      alert("결제 모듈이 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp32623681");

    const buyerName = localStorage.getItem("empName") || "비회원";
    const storeName = localStorage.getItem("storeName") || "CORE POS";
    const storeId = localStorage.getItem("storeId");

    IMP.request_pay(
      {
        pg: "html5_inicis", // 결제 대행사
        pay_method: "card", // 카드 고정 (필요시 UI로 선택 가능)
        name: `${storeName} 매장 결제`,
        amount: totalPrice,
        buyer_name: buyerName,
        buyer_email: "pos@core.com", // 추후 로그인 이메일 사용 가능
        buyer_tel: "010-0000-0000", // 입력 UI 없음 → 고정
      },
      (rsp) => {
        if (rsp.success) {
          // ✅ 성공 시 결제 결과 페이지로 이동
          navigate(`/pos/result?success=true&message=결제가 완료되었습니다.`);
        } else {
          // ❌ 실패 시도 동일 페이지 이동
          navigate(`/pos/result?success=false&message=${encodeURIComponent(rsp.error_msg)}`);
        }
      }
    );
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
