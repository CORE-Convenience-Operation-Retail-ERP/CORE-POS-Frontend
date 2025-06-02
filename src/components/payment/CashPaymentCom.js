import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

const CashPaymentCom = ({ cart, amount, ageGroup, gender, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [receiptType, setReceiptType] = useState("소득공제");
  const [identifier, setIdentifier] = useState("");

  const handleCashPayment = async () => {
    const wantsReceipt = window.confirm("현금영수증을 발급하시겠습니까?");

    if (wantsReceipt && !identifier) {
      alert("식별번호를 입력해주세요.");
      return;
    }

   
    try {
      const storeId = parseInt(localStorage.getItem("storeId"));

      const items = Object.entries(cart);
      const itemList = items.map(([barcode, item]) => {
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
      });

      const paymentData = {
        storeId,
        totalPrice: amount,
        paymentMethod: "CASH",
        impUid: null,
        merchantUid: `cash_${Date.now()}`,
        ageGroup: convertAgeGroupToCode(ageGroup),
        gender: convertGenderToCode(gender),
        cashReceipt: wantsReceipt
          ? {
              type: receiptType,
              identity: identifier,
            }
          : null,
        itemList,
      };

      await savePayment(paymentData);
      
      if (wantsReceipt) {
        alert(
          `현금영수증 발급이 완료되었습니다!\n\n[구분] ${receiptType}\n[식별번호] ${identifier}`
        );
      }

      // 모바일 환경에서의 라우팅 안정성을 위해 setTimeout 사용
      setTimeout(() => {
        navigate("/pos/order", { replace: true });
      }, 100);
    } catch (e) {
      alert("결제 저장 실패: " + e.message);
      setTimeout(() => {
        navigate("/pos/order", { replace: true });
      }, 100);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div style={{ 
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        alignItems: "center"
      }}>
        <label style={{ 
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#334155",
          fontSize: "13px",
          fontWeight: "500"
        }}>
          구분:
          <select
            value={receiptType}
            onChange={(e) => setReceiptType(e.target.value)}
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              color: "#334155",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
              width: "140px"
            }}
          >
            <option value="소득공제">소득공제 (개인)</option>
            <option value="지출증빙">지출증빙 (사업자)</option>
          </select>
        </label>

        <label style={{ 
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#334155",
          fontSize: "13px",
          fontWeight: "500"
        }}>
          식별번호:
          <input
            type="text"
            placeholder="휴대폰 번호 또는 사업자번호"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              color: "#334155",
              fontSize: "13px",
              width: "180px",
              outline: "none"
            }}
          />
        </label>
      </div>

      <button
        onClick={handleCashPayment}
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
        현금 결제하기
      </button>
    </div>
  );
};

export default CashPaymentCom;
