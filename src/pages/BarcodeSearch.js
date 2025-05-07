import { useState } from "react";
import axios from "axios";

function BarcodeSearch() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/barcode`, {
        params: { code: barcode },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("상품 정보 가져오기 실패:", error);
      setProduct(null);
    }
  };

  return (
    <div>
      <h2>바코드 상품 조회</h2>
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
