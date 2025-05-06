// src/components/common/HeaderCom.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderCom = () => {
  const navigate = useNavigate();
  const branchName = localStorage.getItem('storeName') || '지점명';
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/pos'); // 로그인 화면으로 이동
  };

  const goToTransactions = () => {
    navigate('/pos/transactions');
  };

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
        <button onClick={goToTransactions} style={{ marginRight: '8px' }}>🧾 거래내역</button>
        <button onClick={handleLogout}>🔒 로그아웃</button>
      </div>
    </header>
  );
};

export default HeaderCom;
