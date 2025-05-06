import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderCom from '../components/HeaderCom';

const PosLayout = () => {

  const location = useLocation();
  const isLoginPage = location.pathname === '/pos';

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px" }}>
      {/* 로그인 페이지일 때만 상단 타이틀 표시 */}
      {isLoginPage && (
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>🧾 CORE POS</h1>
        </header>
      )}

      {/* 로그인 이외 페이지에서 헤더 표시 */}
      {!isLoginPage && <HeaderCom />}

      <Outlet />

      <footer style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#999" }}>
        ⓒ CORE POS
      </footer>
    </div>
  );
};

export default PosLayout;
