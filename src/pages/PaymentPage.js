import { useLocation } from "react-router-dom";
import PaymentCon from "../containers/payment/PaymentCon";


const PaymentPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || {}; // 주문 페이지에서 넘겨준 장바구니 정보

  return <PaymentCon cart={cart} />;
};

export default PaymentPage;
