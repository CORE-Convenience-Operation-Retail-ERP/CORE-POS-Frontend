import { calculateDiscount } from "../../utils/paymentUtils";

const PaymentSummaryCom = ({ cart }) => {
  const items = Object.values(cart);

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
    <div style={{ 
      marginTop: '16px', 
      padding: '20px', 
      background: '#f8fafc',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h4 style={{ 
        margin: '0 0 16px 0',
        color: '#1e293b',
        fontSize: '18px',
        fontWeight: '600'
      }}>💳 주문 내역</h4>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '12px',
        color: '#64748b',
        fontSize: '15px'
      }}>
        <span>상품 금액</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </div>

      {totalDiscount > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '12px',
          color: '#059669',
          fontSize: '15px'
        }}>
          <span>할인 금액</span>
          <span>-{totalDiscount.toLocaleString()}원</span>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid #e2e8f0',
        color: '#1e293b',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        <span>결제 예정 금액</span>
        <span>{finalAmount.toLocaleString()}원</span>
      </div>

      {/* 프로모션 할인 내역 */}
      {items.some(item => calculateDiscount(item) > 0) && (
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          background: '#f1f5f9',
          borderRadius: '8px'
        }}>
          <p style={{ 
            margin: '0 0 8px 0',
            color: '#64748b',
            fontSize: '14px',
            fontWeight: '500'
          }}>🎁 프로모션 적용 내역</p>
          {items.map((item) => {
            const discount = calculateDiscount(item);
            if (discount > 0) {
              return (
                <div key={item.productId} style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: "13px",
                  color: "#475569",
                  marginBottom: '4px'
                }}>
                  <span>{item.name}</span>
                  <span>-{discount.toLocaleString()}원</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentSummaryCom;
