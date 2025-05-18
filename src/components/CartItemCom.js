import React from 'react';

const CartItemCom = ({ item, onIncrease, onDecrease }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '8px',
        backgroundColor: '#f4f4f4',
        borderRadius: '6px',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{item.name}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={() => onDecrease(item.barcode)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.barcode)}>+</button>
        <span>{(Number(item.price || 0) * Number(item.quantity || 0)).toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default CartItemCom;
