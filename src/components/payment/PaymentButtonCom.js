import { useNavigate } from "react-router-dom";
import { savePayment } from "../../services/PaymentService";

const PaymentButtonCom = ({ cart }) => {
  const navigate = useNavigate();
  const items = Object.entries(cart);

  if (items.length === 0) return null;

  // 할인 적용 후 최종 결제 금액 계산
  const calculateFinalAmount = (item) => {
    const { price, quantity, isPromo } = item;

    if (isPromo === 2) {
      // 1+1
      const paid = Math.floor(quantity / 2) + (quantity % 2);
      return paid * price;
    }
    if (isPromo === 3) {
      // 2+1
      const paid = Math.floor(quantity / 3) * 2 + (quantity % 3);
      return paid * price;
    }
    return price * quantity;
  };
  
  const totalFinalAmount = items.reduce(
    (sum, [, item]) => sum + calculateFinalAmount(item),
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
        pg : "html5_inicis", // 결제 대행사
        pay_method : "card", // 카드 고정 (필요시 UI로 선택 가능)
        merchant_uid: `order_${Date.now()}`, 
        name : `${storeName} 매장 결제`,
        amount : totalFinalAmount,
        buyer_name : buyerName,
        buyer_tel : "010-0000-0000", // 입력 UI 없음 → 고정
      },
      async (rsp) => {
        if (rsp.success) {
          try {
            // 백엔드에 결제 정보 저장
            const paymentData = {
              storeId : parseInt(storeId),
              totalPrice : totalFinalAmount,
              paymentMethod : "card",
              impUid : rsp.imp_uid,
              merchantUid : rsp.merchant_uid,
              itemList : items.map(([barcode, item]) => {
                const originTotal = item.price * item.quantity;
                const finalAmount = calculateFinalAmount(item);
                return {
                  barcode,
                  productId: item.productId,
                  name: item.name,
                  salesQuantity: item.quantity,
                  unitPrice: item.price,
                  isPromo: item.isPromo || 0,
                  discount: originTotal - finalAmount,
                  finalAmount: finalAmount,
                };
              }),
            };

            await savePayment(paymentData);
            // 성공 시 결제 결과 페이지로 이동
            navigate(`/pos/result?success=true&message=결제가 완료되었습니다.`);
          } catch (e) {
            alert("결제는 성공했지만 서버 저장에 실패했습니다.");
            navigate(`/pos/result?success=false&message=서버 저장 실패`);
          }
        } else {
          // 실패 시도 동일 페이지 이동
          navigate(`/pos/result?success=false&message=${encodeURIComponent(rsp.error_msg)}`);
          }
      }
    );
  };

  return (
    <div style={{ textAlign : 'center' }}>
      <h3>💰 총합: {totalFinalAmount.toLocaleString()}원</h3>
      <button
        onClick={handlePayment}
        style={{
          marginTop : '20px',
          backgroundColor : '#3b82f6',
          color : '#fff',
          padding : '14px 24px',
          fontSize : '16px',
          border : 'none',
          borderRadius : '8px',
          cursor : 'pointer'
        }}
      >
        💳 결제하기
      </button>
    </div>
  );
};

export default PaymentButtonCom;
