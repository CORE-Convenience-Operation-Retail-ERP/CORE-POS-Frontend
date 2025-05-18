import { useState } from "react";

const getTypeLabel = (type, isManual) => {
    const map = {
      DAILY: "일별",
      MONTHLY: "월별",
      YEARLY: "연별",
      SHIFT: "교대"
    };
    const mode = isManual === 1 ? "수동" : "자동";
    return `${map[type] || type} 정산 (${mode})`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "날짜 없음";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  };
  
  const RecentSettlementList = ({ settlements }) => {
    const [openIndex, setOpenIndex] = useState(null);
  
    if (!settlements || settlements.length === 0) return null;
  
    return (
      <div style={{ marginTop: "24px", padding: "16px", background: "#f3f4f6", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>🕓 최근 정산</h3>
        {settlements.slice(0, 2).map((item, index) => (
          <div key={item.settlementId || index} style={{ marginBottom: "10px" }}>
            <div
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              ▸ {formatDate(item.settlementDate)} | {getTypeLabel(item.settlementType, item.isManual)}
            </div>
            {openIndex === index && (
              <div style={{ paddingLeft: "16px", fontSize: "14px" }}>
                <p>실매출: {item.finalAmount.toLocaleString()}원 | 전송상태: {item.hqStatus === "SENT" ? "✅ 전송됨" : "❌ 실패"}</p>
                <p>총매출: {item.totalRevenue.toLocaleString()}원 / 할인: {item.discountTotal.toLocaleString()}원 / 환불: {item.refundTotal.toLocaleString()}원</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default RecentSettlementList;