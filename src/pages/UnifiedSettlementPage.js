import { useNavigate } from "react-router-dom";
import UnifiedSettlementCon from "../containers/settlement/UnifiedSettlementCon";

const UnifiedSettlementPage = () => {
  const navigate = useNavigate();

  return (
      <UnifiedSettlementCon />
  );
};

export default UnifiedSettlementPage;
