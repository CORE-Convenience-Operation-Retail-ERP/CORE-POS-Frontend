import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderCom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const branchName = localStorage.getItem('storeName') || '지점명';
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/pos'); // 로그인 화면으로 이동
  };

  const goToTransactions = () => {
    navigate('/pos/transactions');
  };

  const goToOrder = () => {
    navigate('/pos/order');
  };

  const isReceiptPage = location.pathname.startsWith('/pos/receipt');

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>CORE POS</div>
      <div style={{ fontSize: '14px', color: '#666' }}>{branchName}</div>
      <div>
      {location.pathname === '/pos/order' && (
        <button onClick={goToTransactions} style={{ marginRight: '8px' }}>🧾 거래내역</button>
      )}
      {location.pathname === '/pos/transactions' && (
        <button onClick={goToOrder} style={{ marginRight: '8px' }}>🛒 바코드</button>
      )}
      {isReceiptPage && (
        <button onClick={goToTransactions} style={{ marginRight: '8px' }}>
            거래내역
        </button>
      )}
        <button onClick={handleLogout}>🔒 로그아웃</button>
      </div>
    </header>
  );
};

export default HeaderCom;
