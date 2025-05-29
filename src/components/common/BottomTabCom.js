import { useLocation, useNavigate } from "react-router-dom";
import {
  BottomTabBar,
  FabButton,
  TabIcon,
  TabItem,
  TabLabel,
  TabGroup
} from "../../styles/bottomTab.styles";

import {
  FiFileText,
  FiCamera,
  FiBarChart2,
  FiLogOut,
  FiInbox,
} from "react-icons/fi";

function BottomTabCom() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/pos", { replace: true });
  };

  const tabs = [
    { icon: <FiInbox />, label: "보관함", path: "/pos/storage" },
    { icon: <FiFileText />, label: "거래내역", path: "/pos/transactions" },
    { icon: <FiBarChart2 />, label: "정산", path: "/pos/settlement" },
    { icon: <FiLogOut />, label: "로그아웃", path: "/pos", action: handleLogout },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <BottomTabBar>
      {tabs.slice(0, 2).map((tab) => (
        <TabItem
          key={tab.label}
          onClick={() => (tab.action ? tab.action() : navigate(tab.path))}
          className={isActive(tab.path) ? "active" : ""}
        >
          <TabIcon>{tab.icon}</TabIcon>
          <TabLabel>{tab.label}</TabLabel>
        </TabItem>
      ))}

      {/* 가운데 FAB 칸 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FabButton onClick={() => navigate("/pos/order")}>
          <FiCamera style={{ fontSize: "24px", color: "white" }} />
        </FabButton>
      </div>

      {tabs.slice(2).map((tab) => (
        <TabItem
          key={tab.label}
          onClick={() => (tab.action ? tab.action() : navigate(tab.path))}
          className={isActive(tab.path) ? "active" : ""}
        >
          <TabIcon>{tab.icon}</TabIcon>
          <TabLabel>{tab.label}</TabLabel>
        </TabItem>
      ))}
    </BottomTabBar>
  );
}

export default BottomTabCom;
