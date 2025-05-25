import React from "react";
import { useNavigate } from "react-router-dom";
import OrderCon from "../containers/OrderCon";

const OrderPage = () => {
  const navigate = useNavigate();

  const handleGoToPayment = (cart) => {
    navigate("/pos/payment", { state: { cart } });
  };

  return (
    <div>
      <OrderCon onGoToPayment={handleGoToPayment} />
    </div>
  );
};

export default OrderPage;
