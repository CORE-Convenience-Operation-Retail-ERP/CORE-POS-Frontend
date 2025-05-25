import { useState } from "react";
import PaymentTabsCom from "../../components/payment/PaymentTabsCom";
import AgeGenderSelectCom from "../../components/payment/AgeGenderSelectCom";
import PaymentSummaryCom from "../../components/payment/PaymentSummaryCom";
import PaymentButtonCom from "../../components/payment/PaymentButtonCom";
import CashPaymentCom from "../../components/payment/CashPaymentCom";


const PaymentCon = ({ cart }) => {
  const [paymentType, setPaymentType] = useState("CARD");
  const [ageGroup, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(null);

  const isReady = ageGroup && gender;
  const items = Object.values(cart);
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div style={{ padding: "16px" }}>
      <h2>🧾 결제 진행</h2>

      <PaymentTabsCom
        paymentType={paymentType}
        setPaymentType={setPaymentType}
      />

      <AgeGenderSelectCom
        ageGroup={ageGroup}
        setAgeGroup={setAgeGroup}
        gender={gender}
        setGender={setGender}
      />

      <PaymentSummaryCom cart={cart} />

      {isReady && paymentType === "CARD" && (
        <PaymentButtonCom 
          cart={cart}
          ageGroup={ageGroup}
          gender={gender}
        />
      )}

      {isReady && paymentType === "CASH" && (
        <CashPaymentCom
          cart={cart} 
          amount={totalAmount}
          ageGroup={ageGroup}
          gender={gender}
        />
      )}
    </div>
  );
};

export default PaymentCon;