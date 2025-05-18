import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettlementPreviewBox from "../../components/settlement/SettlementPreviewBox";
import RecentSettlementList from "../../components/settlement/RecentSettlementList";
import UnifiedSettlementForm from "../../components/settlement/UnifiedSettlementForm";
import SettlementResultModal from "../../components/settlement/SettlementResultModal";
import { fetchPartTimerList, fetchRecentSettlements, fetchSettlementPreview, requestDailySettlement, requestMonthlySettlement, requestShiftSettlement, requestYearlySettlement } from "../../services/settlementService";

const UnifiedSettlementCon = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("daily");
    const [targetDate, setTargetDate] = useState("");
    const [isManual, setIsManual] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalResult, setModalResult] = useState(null);
    const [preview, setPreview] = useState(null);
    const [recentSettlements, setRecentSettlements] = useState([]);
  
    // 교대 전용
    const [partTimerId, setPartTimerId] = useState("");
    const [shiftStartTime, setShiftStartTime] = useState("");
    const [shiftEndTime, setShiftEndTime] = useState("");
    const [partTimerList, setPartTimerList] = useState([]);

    const storeId = parseInt(localStorage.getItem("storeId"));
    const empId = parseInt(localStorage.getItem("empId"));
  
    useEffect(() => {
      if (targetDate && type === "DAILY") {
        fetchSettlementPreview(storeId, targetDate)
          .then(setPreview)
          .catch(() => setPreview(null));
      } else {
        setPreview(null);
      }
    }, [storeId, targetDate, type]);
  
    useEffect(() => {
      fetchRecentSettlements(storeId).then(setRecentSettlements);
    }, [storeId]);

    useEffect(() => {
        if (type === "SHIFT") {
          fetchPartTimerList()
            .then((data) => {
              console.log("[✅ 아르바이트 목록 도착]", data); 
              setPartTimerList(data);
            })
            .catch(() => {
              console.log("[⚠️ 아르바이트 목록 로딩 실패]");
              setPartTimerList([]);
            });
        }
      }, [type]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!targetDate) {
        setModalResult({
          success: false,
          date: targetDate,
          type,
          message: "정산 날짜를 선택해주세요."
        });
        setModalOpen(true);
        return;
      }
  
      try {
        let res;
        switch (type) {
          case "DAILY":
            res = await requestDailySettlement({
              storeId,
              empId: isManual ? empId : null,
              targetDate,
              isManual: isManual ? 1 : 0
            });
            break;
          case "SHIFT":
            res = await requestShiftSettlement({
              storeId,
              empId: isManual ? empId : null,
              targetDate,
              isManual: isManual ? 1 : 0,
              partTimerId,
              shiftStartTime,
              shiftEndTime,
              type
            });
            break;
          case "MONTHLY":
            const [yearStr, monthStr] = targetDate.split("-");
            const year = Number(yearStr);
            const month = Number(monthStr); // "04" → 4
    
            console.log("[📤 보낼 월별 정산 payload]", { storeId, year, month });

            if (month < 1 || month > 12) {
              throw new Error("유효하지 않은 월입니다.");
            }
    
            res = await requestMonthlySettlement({
              storeId,
              year,
              month
            });
            console.log("[📦 정산 응답 확인]", res);
            break;
          case "YEARLY":
            res = await requestYearlySettlement({
              storeId,
              year: Number(targetDate)
            });
            break;
          default:
            throw new Error("지원하지 않는 정산 유형입니다.");
        }
    
        setModalResult({
          success: true,
          date: targetDate,
          type,
          ...res
        });
      } catch (err) {
        setModalResult({
          success: false,
          date: targetDate,
          type,
          message: err.response?.data || err.message
        });
      } finally {
        setModalOpen(true);
      }
    };
    
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <UnifiedSettlementForm
          type={type}
          onTypeChange={setType}
          targetDate={targetDate}
          onDateChange={setTargetDate}
          isManual={isManual}
          onManualChange={setIsManual}
          partTimerId={partTimerId}
          onPartTimerChange={setPartTimerId}
          shiftStartTime={shiftStartTime}
          onStartChange={setShiftStartTime}
          shiftEndTime={shiftEndTime}
          onEndChange={setShiftEndTime}
          onSubmit={handleSubmit}
          partTimerList={partTimerList}
        />
  
        {preview && type === "DAILY" && <SettlementPreviewBox preview={preview} />}
        {recentSettlements.length > 0 && <RecentSettlementList settlements={recentSettlements} />}
  
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "32px" }}>
          <button
            onClick={() => navigate("/pos/transactions")}
            style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "10px 20px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
            거래 내역
          </button>
          <button
            onClick={() => navigate("/pos/order")}
            style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
            장바구니
          </button>
        </div>
  
        <SettlementResultModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          result={modalResult}
        />
      </div>
    );
  };
  
  export default UnifiedSettlementCon;
  
