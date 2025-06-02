import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import BarcodeScannerCom from "../components/order/BarcodeScannerCom";

function BarcodeSearch() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  const fetchProduct = async (code = barcode) => {
    try {
      const finalCode = typeof code === "string" ? code : String(code);
      console.log("🔍 API 요청 바코드:", finalCode);
  
      const response = await axiosInstance.get(`/api/barcode`, {
        params: { code: finalCode },
      });
  
      console.log("✅ API 응답:", response.data);
      const productData = response.data;

      if (!productData || (!productData.productName && !productData.PRDLST_NM)) {
         alert("등록되지 않은 상품입니다.");
         setProduct(null);
         return;
      }

      setProduct({
          productName: productData.productName || productData.PRDLST_NM || "이름 없음",
          manufacturer: productData.manufacturer || productData.BSSH_NM || "제조사 정보 없음",
          barcode: productData.barcode || finalCode,
          category: productData.category || productData.PRDLST_DCNM || "카테고리 정보 없음",
          price: productData.unitPrice || productData.price || 0,
          expirationInfo: productData.expirationInfo || "유통기한 정보 없음",
          isPromo: productData.isPromo || 0,
      });

    } catch (error) {
      console.error("❌ 상품 정보 가져오기 실패:", error);
      alert("상품 정보를 가져오는데 실패했습니다.");
      setProduct(null);
    }
  };

  const handleScan = (scannedBarcode) => {
    const scannedString = typeof scannedBarcode === "string"
      ? scannedBarcode
      : scannedBarcode?.text || String(scannedBarcode);
  
    console.log("✅ 스캔된 바코드:", scannedString);
    setBarcode(scannedString);
    fetchProduct(scannedString);
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
          {product.price > 0 && <p><strong>가격:</strong> {product.price.toLocaleString()}원</p>}
          {product.expirationInfo && <p><strong>유통기한 정보:</strong> {product.expirationInfo}</p>}
          {product.isPromo > 0 && <p><strong>프로모션:</strong> {product.isPromo}</p>}
        </div>
      )}
    </div>
  );
}

export default BarcodeSearch;
