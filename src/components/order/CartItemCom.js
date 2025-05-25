import React from 'react';

const CartItemCom = ({ item, onIncrease, onDecrease }) => {
  const { name, price, quantity, barcode } = item;
  const total = Number(price || 0) * Number(quantity || 0);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        margin: '0 auto 12px',
        width: '94%',
        maxWidth: '440px',
        background: "#f8fafc",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
        border: "1px solid #e2e8f0"
      }}
    >
      {/* 상품 정보 */}
      <div style={{ flex: 1, marginRight: '16px' }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '6px',
            lineHeight: '1.4'
          }}
        >
          {name}
        </div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 500, 
          color: '#64748b',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{Number(price).toLocaleString()}원</span>
          <span style={{ color: '#94a3b8' }}>×</span>
          <span style={{ color: '#475569' }}>{quantity}</span>
        </div>
      </div>

      {/* 수량 조절 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        background: '#f1f5f9',
        padding: '4px',
        borderRadius: '8px'
      }}>
        <button
          onClick={() => onDecrease(barcode)}
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#5b7de8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#4a6cd4'
            }
          }}
        >
          −
        </button>

        <span style={{ 
          minWidth: '24px', 
          textAlign: 'center', 
          fontWeight: 600,
          color: '#1e293b'
        }}>
          {quantity}
        </span>

        <button
          onClick={() => onIncrease(barcode)}
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#5b7de8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#4a6cd4'
            }
          }}
        >
          ＋
        </button>
      </div>
    </div>
  );
};

export default CartItemCom;
