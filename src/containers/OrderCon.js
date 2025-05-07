import { useState } from "react";
import ManualInputCom from "../components/ManualInputCom";
import CartListCom from "../components/CartListCom";
import PaymentButtonCom from "../components/payment/PaymentButtonCom";
import BarcodeScannerCom from "../components/BarcodeScannerCom";
import PaymentSummaryCom from "../components/payment/PaymentSummaryCom";
import axios from "axios";

function OrderCon(){
    const [cart, setCart] = useState({});
    const [showManualInput, setShowManualInput] = useState(false);
   
    const handleBarcode = async (barcode) => {
        try {
          const response = await axios.get(`/api/barcode`, {
            params: { code: barcode },
          });
    
          const product = response.data;
    
          if (!product || !product.productName) {
            alert("등록되지 않은 상품입니다.");
            return;
          }

          setCart((prev) => ({
            ...prev,
            [barcode]: {
              name: product.productName,
              price: product.price || 1000, // 가격이 없다면 임시 기본값
              isPromo: product.isPromo || 0,
              quantity: (prev[barcode]?.quantity || 0) + 1,
            },
        }));
    } catch (error) {
      console.error("상품 정보 가져오기 실패:", error);
      alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
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

            <BarcodeScannerCom onScanSuccess={(code) => { handleBarcode(code);}}/>
            
            {showManualInput && (<ManualInputCom onBarcodeSubmit={handleBarcode} /> )}

            <CartListCom cart={cart} onIncrease={handleIncrease} onDecrease={handleDecrease} />
            <PaymentSummaryCom cart={cart} />
            <PaymentButtonCom cart={cart} />
    </div>
  );
};

export default OrderCon;