import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScannerCom = ({ onScanSuccess, onRetry, scanTimeout = 15000 }) => {
  const isScannedRef = useRef(false);
  const scannerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    isScannedRef.current = false;
    setErrorMsg("");

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: (w, h) => {
          const size = Math.floor(Math.min(w, h) * 0.6);
          return { width: size, height: size };
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
          clearTimeout(timeoutRef.current);
          onScanSuccess(decodedText);

          scannerRef.current
            ?.pause()
            .catch((e) => console.error("❌ 스캐너 일시정지 실패:", e));
        }
      },
      (error) => {}
    );

    return () => {
      clearTimeout(timeoutRef.current);
      scannerRef.current
        ?.clear()
        .catch((e) => console.error("❌ 언마운트 시 스캐너 클리어 실패:", e));
    };
  }, [onScanSuccess, scanTimeout]);

  return (
    <div>
      <h3 style={{ marginBottom: "16px", color: "#333", fontSize: "16px" }}></h3>
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
      {errorMsg && (
        <div style={{ marginTop: "12px" }}>
          <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScannerCom;
