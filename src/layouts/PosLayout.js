import React from 'react';
import { Outlet } from 'react-router-dom';

const PosLayout = () => {
  return (
    <div style={{ padding: '16px', maxWidth: '480px', margin: '0 auto' }}>
      {/* POS 공통 레이아웃 (예: 헤더) */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px' }}>🧾 POS 시스템</h1>
      </header>

      {/* 여기에 각 하위 경로가 렌더링됨 */}
      <Outlet />

      {/* POS 푸터가 있다면 여기도 가능 */}
    </div>
  );
};

export default PosLayout;
