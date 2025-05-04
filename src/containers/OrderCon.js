import { useState } from "react";
import ManualInputCom from "../components/ManualInputCom";
import CartListCom from "../components/CartListCom";
import PaymentButtonCom from "../components/payment/PaymentButtonCom";
import BarcodeScannerCom from "../components/BarcodeScannerCom";

function OrderCon(){
    const [cart, setCart] = useState({});
    const [showManualInput, setShowManualInput] = useState(false);
   

    // 추후 백엔드 연동
    const productDB = {
        "6920339019631": { name: "초코바", price: 1000 },
        "8806416055519": { name: "콜라", price: 1500 },
        "8809988776655": { name: "삼각김밥", price: 1800 }
    };

    const handleBarcode = (barcode) => {
        const product = productDB[barcode];
        if (!product) {
            alert("등록되지 않은 상품입니다.");
            return;
        }

        setCart((prev) => ({
            ...prev,
            [barcode]: {
                ...product,
                quantity: (prev[barcode]?.quantity || 0) + 1
            }
        }));
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
            <PaymentButtonCom cart={cart} />
    </div>
  );
};

export default OrderCon;