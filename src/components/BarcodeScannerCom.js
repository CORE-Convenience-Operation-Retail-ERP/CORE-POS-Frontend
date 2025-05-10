import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScannerCom = ({ onScanSuccess }) => {

  const isScannedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      {
        fps: 10, 
        qrbox: { width: 250, height: 250 } 
      },
      false 
    );

    scanner.render(
      (decodedText) => {
     if (!isScannedRef.current && decodedText) {
          console.log("✅ 스캔된 바코드:", decodedText);
          isScannedRef.current = true;

          onScanSuccess(decodedText); // 부모 컴포넌트로 전달

          // 잠깐 기다린 후 clear → 스캐너 안정성 보장
          setTimeout(() => {
            scanner.clear().catch((e) =>
              console.error("❌ 스캐너 클리어 실패:", e)
            );
          }, 1000);
        }
      },
      (errorMessage) => {
        
      }
    );

    return () => {
      scanner.clear().catch((e) =>
        console.error("❌ 언마운트 시 클리어 실패:", e)
      );
    };
  }, [onScanSuccess]);

  return (
    <div>
      <h3> 바코드를 카메라에 비춰주세요</h3>
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
};

export default BarcodeScannerCom;
