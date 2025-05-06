import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const success = query.get("success"); 
    const message = query.get("message") || "";
    const isSuccess = success === "true";

    useEffect(() => {
        // 몇 초 후 자동으로 주문 페이지로 이동
        const timer = setTimeout(() => {
            navigate("/pos/order");
        }, 5000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{success === "true" ? "✅ 결제 성공!" : "❌ 결제 실패"}</h2>
      <p style={{ marginTop: "16px", fontSize: "18px" }}>
        {message ||
          (isSuccess
            ? "결제가 정상적으로 완료되었습니다."
            : "결제가 실패했습니다. 다시 시도해주세요.")}
      </p>
      <p style={{ marginTop: "20px" }}>5초 후 주문 화면으로 이동합니다...</p>
      <button
        onClick={() => navigate("/pos/order")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        주문 페이지로 바로 이동
      </button>
    </div>
  );
};
export default PaymentResultPage;