import { useNavigate } from "react-router-dom";
import UnifiedSettlementCon from "../containers/settlement/UnifiedSettlementCon";

const UnifiedSettlementPage = () => {
  const navigate = useNavigate();

  return (
    <main style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "22px" }}>🧾 매출 정산 페이지</h1>
      </header>

      <UnifiedSettlementCon />
    </main>
  );
};

export default UnifiedSettlementPage;

  
