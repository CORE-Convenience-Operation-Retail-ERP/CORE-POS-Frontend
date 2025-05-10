import { useState } from "react";
import axios from "axios";
import BarcodeScannerCom from "../components/BarcodeScannerCom";

function BarcodeSearch() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  const fetchProduct = async (code = barcode) => {
    try {
      const finalCode = typeof code === "string" ? code : String(code);
      console.log("🔍 API 요청 바코드:", finalCode);
  
      const response = await axios.get(`/api/barcode`, {
        params: { code: finalCode },
      });
  
      console.log("✅ API 응답:", response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("❌ 상품 정보 가져오기 실패:", error);
      setProduct(null);
    }
  };

  const handleScan = (scannedBarcode) => {
    const scannedString = typeof scannedBarcode === "string"
      ? scannedBarcode
      : scannedBarcode?.text || String(scannedBarcode);
  
    console.log("✅ 스캔된 바코드:", scannedString);
    setBarcode(scannedString);
    fetchProduct(scannedString); // 항상 문자열로 넘겨야 함
  };
  

  return (
    <div>
      <h2>바코드 상품 조회</h2>

      <BarcodeScannerCom onScanSuccess={handleScan} /> 
      <input
        type="text"
        placeholder="바코드를 입력하세요"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={fetchProduct}>조회</button>

      {product && (
        <div>
          <p><strong>상품명:</strong> {product.productName}</p>
          <p><strong>제조사:</strong> {product.manufacturer}</p>
          <p><strong>바코드:</strong> {product.barcode}</p>
          <p><strong>카테고리:</strong> {product.category}</p>
        </div>
      )}
    </div>
  );
}

export default BarcodeSearch;
