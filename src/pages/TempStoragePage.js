import { useNavigate } from "react-router-dom";
import TempStorageCon from "../containers/tempStorage/TempStorageCon";

const TempStoragePage = () => {
  const navigate = useNavigate();

  const handleRestoreCart = (cart) => {
    // 장바구니 복원 시 localStorage 또는 전역 상태에 저장 후 이동
    localStorage.setItem("restoredCart", JSON.stringify(cart));
    navigate("/pos/order", { state: { fromTemp: true } });
  };

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <TempStorageCon onRestoreCart={handleRestoreCart} />
    </main>
  );
};

export default TempStoragePage;
