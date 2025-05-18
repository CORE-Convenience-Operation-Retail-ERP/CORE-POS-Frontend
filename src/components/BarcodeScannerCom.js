import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScannerCom = ({ onScanSuccess }) => {
  const isScannedRef = useRef(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdgePercentage = 0.6;
          const edgeLength = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * minEdgePercentage);
          return { width: edgeLength, height: edgeLength };
        },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
     if (!isScannedRef.current && decodedText) {
          console.log("✅ 스캔된 바코드:", decodedText);
          isScannedRef.current = true;

          onScanSuccess(decodedText); // 부모 컴포넌트로 전달

          // 잠깐 기다린 후 clear → 스캐너 안정성 보장
          setTimeout(() => {
            scannerRef.current
              ?.clear()
              .catch((e) => console.error("❌ 스캐너 클리어 실패:", e));
          }, 1000);
        }
      },
      (errorMessage) => {
        console.warn("📛 스캔 실패 또는 카메라 접근 불가:", errorMessage);
      }
    );

    return () => {
      scannerRef.current
        ?.clear()
        .catch((e) => console.error("❌ 언마운트 시 스캐너 클리어 실패:", e));
    };
  }, [onScanSuccess]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>📷 바코드를 카메라에 비춰주세요</h3>
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          borderRadius: "8px"
        }}
      />
    </div>
  );
};

export default BarcodeScannerCom;