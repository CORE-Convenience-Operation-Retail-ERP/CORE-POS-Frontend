const SettlementPreviewBox = ({ preview }) => {
  if (!preview) return null;

  const typeLabelMap = {
    DAILY: "일별",
    SHIFT: "교대",
    MONTHLY: "월별",
    YEARLY: "연별",
  };

  const typeLabel = typeLabelMap[preview.settlementType?.toUpperCase()] || preview.settlementType || "";

  return (
    <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
      <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>📊 {typeLabel} 정산 예상 요약</h3>
      <p>총매출: {(preview.totalRevenue ?? 0).toLocaleString()}원</p>
      <p>할인: {(preview.discountTotal ?? 0).toLocaleString()}원</p>
      <p>환불: {(preview.refundTotal ?? 0).toLocaleString()}원</p>
      <p>
        <strong>실매출: {(preview.finalAmount ?? 0).toLocaleString()}원</strong>
      </p>
      <p>
        거래건수: {preview.transactionCount ?? 0}건 / 환불건수: {preview.refundCount ?? 0}건
      </p>
    </div>
  );
};

export default SettlementPreviewBox;
