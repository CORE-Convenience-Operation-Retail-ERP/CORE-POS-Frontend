import React from 'react';

const HeaderCom = () => {
  const branchName = localStorage.getItem('storeName') || '지점명';

  return (
    <header style={{
      backgroundColor: "#fff",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px 10px', 
      borderBottom: '1px solid #eee',
      marginBottom: '20px',
      position: 'relative',
    }}>
      {/* 가운데 정렬을 위한 비어있는 왼쪽 */}
      <div style={{ width: '80px' }}></div>

      {/* 로고 가운데 정렬 */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: '18px',
      }}>
        <img src="/core_logo.png" alt="CORE 로고" style={{ height: 30 }} />
      </div>

      {/* 지점명 우측 정렬 + 여백 */}
      <div style={{ fontSize: '16px', color: '#666', marginRight: '30px' }}>
        {branchName}
      </div>
    </header>
  );
};

export default HeaderCom;
