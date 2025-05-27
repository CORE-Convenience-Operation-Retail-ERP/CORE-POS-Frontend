import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentSummaryCom from "../components/payment/PaymentSummaryCom";
import DisposalModal from "../components/DisposalModal";
import { fetchRelatedProducts } from "../services/fetchRelatedProducts";
import { fetchFoodProduct } from "../services/fetchFoodProduct";
import axiosInstance from "../services/axiosInstance";
import { saveTempCart } from "../services/tempStorageService";
import BarcodeScannerCom from "../components/order/BarcodeScannerCom";
import CartListCom from "../components/order/CartListCom";
import ManualInputCom from "../components/order/ManualInputCom";

const SCAN_RESET_DELAY = 1000;

function OrderCon({ onGoToPayment }) {
  const [cart, setCart] = useState({});
  const [scannerActive, setScannerActive] = useState(true);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [isDisposalModalOpen, setIsDisposalModalOpen] = useState(false);
  const isScannedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromTemp) {
      const restored = localStorage.getItem("restoredCart");
      if (restored) {
        try {
          const parsed = JSON.parse(restored);
          setCart(parsed);
        } catch (e) {
          console.error("복원된 장바구니 파싱 실패", e);
        }
      }
    }
  }, [location.state]);

  const handleExternalFallback = async (barcode) => {
    const external = await fetchFoodProduct(barcode);
    if (!external?.barcode) {
      alert("공공 API에서 상품을 찾을 수 없습니다.");
      return;
    }

    const externalBarcode = external.barcode;
    await fetchRelatedProducts(externalBarcode);

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
  };

  const handleBarcode = async (barcode) => {
    if (isScannedRef.current) return;
    isScannedRef.current = true;
    setScannerActive(false);

    try {
      const response = await axiosInstance.get(`/api/barcode`, { params: { code: barcode } });
      const product = response.data;

      if (!product || (!product.productName && !product.PRDLST_NM)) {
        alert("등록되지 않은 상품입니다.");
        return;
      }

      if (product.isExpired) {
        setScannedProduct({
          stockId: product.stockId,
          productId: product.productId,
          proName: product.productName,
          unitPrice: product.unitPrice,
        });
        setIsDisposalModalOpen(true);
        return;
      }

      const productName = product.productName || product.PRDLST_NM || "이름 없음";

      setCart((prev) => ({
        ...prev,
        [barcode]: {
          productId: product.productId,
          stockId: product.stockId,
          name: productName,
          price: product.unitPrice,
          isPromo: product.isPromo || 0,
          quantity: (prev[barcode]?.quantity || 0) + 1,
        },
      }));
    } catch (error) {
      console.error("상품 정보 가져오기 실패:", error);
      await handleExternalFallback(barcode);
    } finally {
      setTimeout(() => {
        setScannerActive(true);
        isScannedRef.current = false;
      }, SCAN_RESET_DELAY);
    }
  };

  const handleIncrease = (barcode) => {
    setCart((prev) => ({
      ...prev,
      [barcode]: {
        ...prev[barcode],
        quantity: prev[barcode].quantity + 1,
      },
    }));
  };

  const handleDecrease = (barcode) => {
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
          quantity: current.quantity - 1,
        },
      };
    });
  };

  const handleSaveTempCart = () => {
    saveTempCart(cart);
    alert("🗂️ 임시보관함에 저장되었습니다.");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "480px", margin: "0 auto" }}>
      {/* 바코드 입력 */}
      <div style={{ textAlign: "right", marginTop: "20px", marginBottom: "20px" }}>
        <ManualInputCom onBarcodeSubmit={handleBarcode} />
      </div>

      {/* 스캐너 */}
      <div style={{ marginBottom: "15px" }}>
      {scannerActive && (
        <BarcodeScannerCom
          onScanSuccess={handleBarcode}
          onRetry={() => setScannerActive(true)}
        />
      )}
      </div>

      {/* 장바구니 */}
      <div style={{ marginBottom: "20px" }}>
      <CartListCom
        cart={cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      </div>

      {/* 결제 요약 */}
      <div style={{ marginBottom: "20px" }}>
        <PaymentSummaryCom cart={cart} />
      </div>

      {/* 하단 버튼 */}
      {Object.keys(cart).length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap: "10px" }}>
          <button
            onClick={() => onGoToPayment(cart)}
            style={{
              flex: 1,
              backgroundColor: "#5b7de8",
              color: "#fff",
              padding: "12px 0",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            💳 결제하기
          </button>
          <button
            onClick={handleSaveTempCart}
            style={{
              flex: 1,
              backgroundColor: "#9f7aea",
              color: "#fff",
              padding: "12px 0",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            💾 임시보관
          </button>
        </div>
      )}

      {/* 폐기 모달 */}
      <DisposalModal
        isOpen={isDisposalModalOpen}
        onClose={() => {
          setIsDisposalModalOpen(false);
          setScannerActive(true);
        }}
        productInfo={scannedProduct}
      />
    </div>
  );
}

export default OrderCon;
