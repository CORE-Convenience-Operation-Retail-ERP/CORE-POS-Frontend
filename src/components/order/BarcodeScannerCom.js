import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScannerCom = ({ onScanSuccess }) => {
  const isScannedRef = useRef(false);
  const scannerRef = useRef(null);


  useEffect(() => {
    // 이미 초기화되어 있다면 중복 초기화 방지
    if (scannerRef.current) return;

    // 스캐너 인스턴스 생성
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: (w, h) => {
          const size = Math.floor(Math.min(w, h) * 0.6);
          return { width: Math.max(size, 100), height: Math.max(size, 100) };
        },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        if (!isScannedRef.current && decodedText) {
          isScannedRef.current = true;
          onScanSuccess(decodedText);

          // 1초 후 다시 스캔 가능하도록 설정
          setTimeout(() => {
            isScannedRef.current = false;
          }, 1000);
        }
      },
      (error) => {
        // 스캔 실패 시 자동 재시도
        if (!isScannedRef.current) {
          // 2초 후 자동 재시도
          setTimeout(() => {
            // 오류 상태 해제
          }, 2000);
        }
      }
    );

    return () => {
      scannerRef.current?.clear()
        .then(() => {
          scannerRef.current = null;
        })
        .catch((e) => {
          console.error("언마운트 시 스캐너 클리어 실패:", e);
          scannerRef.current = null;
        });
    };
  }, [onScanSuccess]);

  return (
    <div>
      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "360px",
          margin: "0 auto",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default BarcodeScannerCom;
