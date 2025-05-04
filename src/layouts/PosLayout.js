import React from 'react';
import { Outlet } from 'react-router-dom';

const PosLayout = () => {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>🧾 CORE POS 시스템</h1>
      </header>

      {/* 자식 컴포넌트가 여기에 들어감 */}
      <Outlet />

      <footer style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999' }}>
        ⓒ CORE POS
      </footer>
    </div>
  );
};

export default PosLayout;
