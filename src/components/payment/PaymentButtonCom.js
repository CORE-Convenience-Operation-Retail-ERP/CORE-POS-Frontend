import { useNavigate } from "react-router-dom";
import { savePayment } from "../../services/PaymentService";
import { calculateFinalAmount } from "../../utils/paymentUtils";

// 숫자 매핑 유틸
const convertAgeGroupToCode = (ageGroup) => {
  const map = {
    "10대": 10,
    "20대": 20,
    "30대": 30,
    "40대": 40,
    "50대": 50,
    "60대 이상": 60,
  };
  return map[ageGroup] || 0;
};

const convertGenderToCode = (gender) => {
  return gender === "남" ? 0 : 1;
};

const PaymentButtonCom = ({ cart, ageGroup, gender, onPaymentComplete }) => {
  const navigate = useNavigate();
  const items = Object.entries(cart);

  if (items.length === 0) return null;

  const totalFinalAmount = items.reduce(
    (sum, [, item]) => sum + calculateFinalAmount(item),
    0
  );

  const handlePayment = () => {
    if (!window.IMP) {
      alert("결제 모듈이 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMP_KEY);

    const storeName = localStorage.getItem("storeName") || "CORE POS";
    const storeId = localStorage.getItem("storeId");

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "CARD",
        merchant_uid: `order_${Date.now()}`,
        name: `${storeName} 매장 결제`,
        amount: totalFinalAmount,
        popup: true,
      },
      async (rsp) => {
        if (rsp.success) {
          try {
            const paymentData = {
              storeId: parseInt(storeId),
              totalPrice: totalFinalAmount,
              paymentMethod: "CARD",
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              ageGroup: convertAgeGroupToCode(ageGroup),
              gender: convertGenderToCode(gender),
              itemList: items.map(([barcode, item]) => {
                const originTotal = item.price * item.quantity;
                const finalAmount = calculateFinalAmount(item);
                return {
                  barcode,
                  stockId: item.stockId,
                  productId: item.productId,
                  name: item.name,
                  salesQuantity: item.quantity,
                  unitPrice: item.price,
                  isPromo: item.isPromo || 0,
                  discountPrice: originTotal - finalAmount,
                  finalAmount: finalAmount,
                };
              }),
            };

            await savePayment(paymentData);
            // 모바일 환경에서의 라우팅 안정성을 위해 setTimeout 사용
            setTimeout(() => {
              navigate("/pos/order", { replace: true });
            }, 100);
          } catch (e) {
            alert("결제는 성공했지만 서버 저장에 실패했습니다.");
            setTimeout(() => {
              navigate("/pos/order", { replace: true });
            }, 100);
          }
        } else {
          alert(rsp.error_msg);
          setTimeout(() => {
            navigate("/pos/order", { replace: true });
          }, 100);
        }
      }
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ 
        color: '#334155',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px'
      }}>
        총합: {totalFinalAmount.toLocaleString()}원
      </h3>
      <button
        onClick={handlePayment}
        style={{
          padding: "14px 24px",
          fontSize: "16px",
          backgroundColor: "#5b7de8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(91, 125, 232, 0.1)"
        }}
      >
        결제하기
      </button>
    </div>
  );
};

export default PaymentButtonCom;
