const UnifiedSettlementForm = ({
  type,
  onTypeChange,
  targetDate,
  onDateChange,
  isManual,
  onManualChange,
  partTimerId,
  onPartTimerChange,
  shiftStartTime,
  onStartChange,
  shiftEndTime,
  onEndChange,
  onSubmit,
  partTimerList = []
}) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "24px" }}>
      <h2 style={{ marginBottom: "10px" }}>🧾 정산</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>정산 유형: </label>
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="DAILY">일별</option>
          <option value="SHIFT">교대</option>
          <option value="MONTHLY">월별</option>
          <option value="YEARLY">연별</option>
        </select>
      </div>

      {/* 날짜 입력 분기 */}
      {type === "DAILY" && (
        <div style={{ marginBottom: "10px" }}>
          <label>정산 날짜: </label>
          <input type="date" value={targetDate} onChange={(e) => onDateChange(e.target.value)} />
        </div>
      )}

      {type === "MONTHLY" && (
        <div style={{ marginBottom: "10px" }}>
          <label>정산 월: </label>
          <input type="month" value={targetDate} onChange={(e) => onDateChange(e.target.value)} />
        </div>
      )}

      {type === "YEARLY" && (
        <div style={{ marginBottom: "10px" }}>
          <label>정산 연도: </label>
          <input type="number" value={targetDate} onChange={(e) => onDateChange(e.target.value)} min="2000" max="2100" />
        </div>
      )}

      {/* 교대 정산 전용 입력 */}
      {type === "SHIFT" && (
      <>
      <div style={{ marginBottom: "10px" }}>
        <label>정산 날짜: </label>
        <input type="date" value={targetDate} onChange={(e) => onDateChange(e.target.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>👤 아르바이트 선택: </label>
        <select value={partTimerId} onChange={(e) => onPartTimerChange(e.target.value)}>
        <option value="">선택</option>
        {Array.isArray(partTimerList) && partTimerList.length > 0 ? (
          partTimerList.map((pt) => (
            <option key={pt.partTimerId} value={pt.partTimerId}>
              {pt.partName}
            </option>
          ))
        ) : (
          <option disabled>데이터 없음</option>
        )}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>교대 시작 시간: </label>
        <input type="datetime-local" value={shiftStartTime} onChange={(e) => onStartChange(e.target.value)} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>교대 종료 시간: </label>
        <input type="datetime-local" value={shiftEndTime} onChange={(e) => onEndChange(e.target.value)} />
      </div>
      </>
      )}


      {/* 수동 정산 여부 */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input type="checkbox" checked={isManual} onChange={(e) => onManualChange(e.target.checked)} />
          수동 정산 (등록자 지정)
        </label>
      </div>

      <button type="submit" style={{ marginTop: "10px", padding: "8px 16px", borderRadius: "6px", backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer" }}>
        ✅ 정산하기
      </button>
    </form>
  );
};

export default UnifiedSettlementForm;