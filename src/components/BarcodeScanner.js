import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = ({ onScanSuccess }) => {
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
        console.log(" 바코드 :", decodedText);
        onScanSuccess(decodedText); 
        scanner.clear(); 
      },
      (errorMessage) => {
        
      }
    );

    return () => {
      scanner.clear().catch((e) => console.error(" 클리어 실패:", e));
    };
  }, [onScanSuccess]);

  return (
    <div>
      <h3> 바코드를 카메라에 비춰주세요</h3>
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
};

export default BarcodeScanner;
