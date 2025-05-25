import { Outlet, useLocation } from "react-router-dom";
import HeaderCom from "../components/common/HeaderCom";
import BottomTabCom from "../components/common/BottomTabCom";
import PageCardWrapper from "../styles/PageCardWrapper";

function MainLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/pos";

  if (isLoginPage) return <Outlet />;

  return (
    <>
    <PageCardWrapper>
      <HeaderCom />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
    </PageCardWrapper>
    <BottomTabCom />
    </>
  );
}

export default MainLayout;
