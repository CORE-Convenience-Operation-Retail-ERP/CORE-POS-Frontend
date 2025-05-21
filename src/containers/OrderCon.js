import { useState } from "react";
import ManualInputCom from "../components/ManualInputCom";
import CartListCom from "../components/CartListCom";
import PaymentButtonCom from "../components/payment/PaymentButtonCom";
import BarcodeScannerCom from "../components/BarcodeScannerCom";
import PaymentSummaryCom from "../components/payment/PaymentSummaryCom";
import api from "../services/axiosInstance";
import DisposalModal from "../components/DisposalModal";
import { fetchRelatedProducts } from "../services/fetchRelatedProducts";
import { fetchFoodProduct } from "../services/fetchFoodProduct";

function OrderCon(){
    const [cart, setCart] = useState({});
    const [showManualInput, setShowManualInput] = useState(false);
    const [scannerActive, setScannerActive] = useState(true);
    const [scannedProduct, setScannedProduct] = useState(null);
    const [isDisposalModalOpen, setIsDisposalModalOpen] = useState(false);

   
    const handleBarcode = async (barcode) => {
      setScannerActive(false); // 일시 중지
    
      try {
        const response = await api.get(`/api/barcode`, {
          params: { code: barcode },
        });
    
        const product = response.data;
        console.log("📦 받아온 상품 정보:", product);
    
        if (!product || (!product.productName && !product.PRDLST_NM)) {
          console.warn("❗ 응답 구조:", product);
          alert("등록되지 않은 상품입니다.");
          return;
        }

        // 폐기 대상 여부 판단 (예: 만료일 확인)
        if (product.isExpired) {
            // 폐기 대상이면 모달 띄우기
            setScannedProduct({
              stockId: product.stockId,
              productId: product.productId,
              proName: product.productName,
              unitPrice: product.unitPrice,
            });
            setIsDisposalModalOpen(true); // 모달 오픈
            return; // 장바구니에는 추가하지 않음
          }
        
        // 일반 상품은 장바구니에 추가
        const productName = product.productName || product.PRDLST_NM || "이름 없음";

        setCart((prev) => ({
          ...prev,
          [barcode]: {
            productId: product.productId,
            stockId: product.stockId,
            name: product.productName,
            price: product.unitPrice, 
            isPromo: product.isPromo || 0,
            quantity: (prev[barcode]?.quantity || 0) + 1,
          },
        }));
      } catch (error) {
        console.error("상품 정보 가져오기 실패:", error);
        alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
      
        const external = await fetchFoodProduct(barcode);
        if (!external || !external.barcode) {
          alert("공공 API에서 상품을 찾을 수 없습니다.");
          return;
        }
      
        const externalBarcode = external.barcode;
      
        console.log("✅ 공공 API 결과:", external);
        console.log("바코드:", externalBarcode);
        console.log("상품명:", external.name);
        console.log("가격:", external.price);
      
        const related = await fetchRelatedProducts(externalBarcode);
        console.log("🔁 연계 상품:", related);
      
        setCart((prev) => ({
          ...prev,
          [externalBarcode]: {
            productId: null,
            stockId: null,
            name: external.name || external.productName || "이름 없음",
            price: Number(external.price) || 0,
            isPromo: 0,
            quantity: (prev[externalBarcode]?.quantity || 0) + 1,
          },
        }));
      } finally {
        // 1초 후 스캐너 다시 활성화
        setTimeout(() => {
          setScannerActive(true);
        }, 1000);
      }
    };

    const handleIncrease = (barcode) => {
        setCart((prev) => ({
            ...prev,
            [barcode]: {
                ...prev[barcode],
                quantity: prev[barcode].quantity + 1
            }
        }));
    };

    const handleDecrease = (barcode) =>{
        setCart((prev) => {
            const current = prev[barcode];
            if (!current) return prev;
            if (current.quantity === 1) {
                const updated = { ...prev };
                delete updated[barcode];
                return updated;
            }
            return {
                ...prev,
                [barcode]: {
                    ...current,
                    quantity: current.quantity - 1
                }
            };
        });
    };

    return(
        <div style={{ padding: '16px' }}>
            <h2>📦 바코드 주문 화면</h2>

            <button onClick={() => setShowManualInput((prev) => !prev)}
                style={{ marginBottom: '16px' }}
            >
                {showManualInput ? '❌ 입력창 닫기' : '✍️ 바코드 직접 입력'}
            </button>

            {showManualInput ? (
              <ManualInputCom onBarcodeSubmit={handleBarcode} />
            ) : (
              scannerActive && (
                <BarcodeScannerCom onScanSuccess={(code) => handleBarcode(code)} />
              )
            )}

            <CartListCom cart={cart} onIncrease={handleIncrease} onDecrease={handleDecrease} />
            <PaymentSummaryCom cart={cart} />
            <PaymentButtonCom cart={cart} />

            {/* 폐기 등록 모달 */}
            <DisposalModal isOpen={isDisposalModalOpen} 
            onClose={() => {
                setIsDisposalModalOpen(false);
                setScannerActive(true); // 모달 닫으면 스캐너 재활성화
            }}
        productInfo={scannedProduct}
      />
    </div>
  );
};

export default OrderCon;