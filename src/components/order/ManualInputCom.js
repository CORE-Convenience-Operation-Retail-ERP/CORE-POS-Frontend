import { useState } from "react";
import BarcodeScannerCom from "./BarcodeScannerCom"; // 상대 경로는 프로젝트에 맞게 조정

const ManualInputCom = ({ onBarcodeSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) {
      alert("바코드를 입력해주세요.");
      return;
    }
    onBarcodeSubmit(input.trim());
    setInput('');
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* 검색창 스타일의 바코드 입력 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        background: "#f8fafc",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid #e2e8f0",
        width: "100%",
        maxWidth: "340px",
        margin: "0 auto",
        height: "36px"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "6px",
          flex: 1,
          height: "100%"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="바코드를 입력하세요"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              flex: 1,
              padding: '0',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#334155',
              width: '100%',
              height: '100%',
              lineHeight: '1'
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: '4px 12px',
            backgroundColor: '#5b7de8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            height: '28px'
          }}
        >
          추가
        </button>
      </div>

      {/* 스캐너는 항상 보여줌 */}
      <BarcodeScannerCom
        onScanSuccess={onBarcodeSubmit}
        onRetry={() => {}}
      />
    </div>
  );
};

export default ManualInputCom;
