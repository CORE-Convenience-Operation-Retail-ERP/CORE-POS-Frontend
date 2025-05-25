import { useState } from "react";

const getTypeText = (type) => {
  const map = {
    DAILY: "일별",
    MONTHLY: "월별",
    YEARLY: "연별",
    SHIFT: "교대",
  };
  return map[type] || type;
};

  const formatDate = (dateStr) => {
    if (!dateStr) return "날짜 없음";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };
  
  const badgeStyle = (isManual) => ({
    fontSize: "12px",
    fontWeight: 500,
    backgroundColor: isManual ? "#facc15" : "#d1fae5",
    color: isManual ? "#92400e" : "#065f46",
    borderRadius: "6px",
    padding: "2px 8px",
    marginLeft: "auto",
  });

const RecentSettlementList = ({ settlements }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!settlements || settlements.length === 0) return null;

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ fontSize: "16px", marginBottom: "12px", fontWeight: "bold" }}>
        🕓 최근 정산
      </h3>

      {settlements.slice(0, 2).map((item, index) => {
        const isOpen = openIndex === index;
        const isManual = item.isManual === 1;

        return (
          <div
            key={item.settlementId || index}
            style={{
              marginBottom: "14px",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "12px 16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            {/* 상단 요약 */}
            <div
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
                fontSize: "15px",
                color: "#1f2937",
              }}
            >
              <span style={{ marginRight: "6px" }}>{isOpen ? "🔽" : "▶️"}</span>
              {formatDate(item.settlementDate)} | {getTypeText(item.settlementType)}
              <span style={badgeStyle(isManual)}>{isManual ? "수동" : "자동"}</span>
            </div>

            {/* 상세 내용 */}
            {isOpen && (
              <div style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.5", color: "#374151" }}>
                  <strong>실매출 : </strong> {(item.finalAmount ?? 0).toLocaleString()}원<br />
                  <strong>총매출 : </strong> {(item.totalRevenue ?? 0).toLocaleString()}원<br />
                  <strong>할인 : </strong> {(item.discountTotal ?? 0).toLocaleString()}원<br />
                  <strong>환불 : </strong> {(item.refundTotal ?? 0).toLocaleString()}원
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecentSettlementList;
