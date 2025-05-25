import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionListCon from "../containers/payment/TransactionListCon";

const TransactionPage = () => {
  const navigate = useNavigate();

  return (
    
      <TransactionListCon />
  );
};

export default TransactionPage;
