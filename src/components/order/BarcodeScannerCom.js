import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScannerCom = ({ onScanSuccess }) => {
  const isScannedRef = useRef(false);
  const scannerRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState("바코드를 카메라에 비춰주세요");
  const [isError, setIsError] = useState(false);

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
          setStatusMsg("상품을 인식했습니다");
          setIsError(false);

          onScanSuccess(decodedText);

          // 1초 후 다시 스캔 가능하도록 설정 및 메시지 초기화
          setTimeout(() => {
            isScannedRef.current = false;
            setStatusMsg("바코드를 카메라에 비춰주세요");
          }, 1000);
        } else {
           // 이미 스캔 처리 중인 경우 무시
        }
      },
      (error) => {
        // 스캔 실패 시 오류 메시지 표시 및 자동 재시도
        if (!isScannedRef.current) {
          setStatusMsg("바코드를 인식하지 못했습니다. 다시 비춰주세요");
          setIsError(true);

          // 2초 후 오류 상태 해제 및 메시지 초기화 (자동 재시도)
          setTimeout(() => {
             setIsError(false);
             setStatusMsg("바코드를 카메라에 비춰주세요");
          }, 2000); // 오류 메시지 표시 시간
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
          scannerRef.current = null; // 실패해도 ref는 null로 설정
        });
    };
  }, [onScanSuccess]); // onScanSuccess가 변경될 때만 effect 재실행

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
      {statusMsg && (
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <p
            style={{
              color: isError ? "red" : "#333",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {statusMsg}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScannerCom;
