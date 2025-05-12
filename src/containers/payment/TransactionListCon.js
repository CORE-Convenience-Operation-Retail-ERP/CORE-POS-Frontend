import { useEffect, useState } from "react";
import TransactionCardCom from "../../components/payment/TransactionListCardCom.js";
import { fetchTransactions, refundTransaction } from "../../services/TransactionService";

const TransactionListCon = () => {
  const [transactions, setTransactions] = useState([]);

  // 거래내역 가져오기
  const loadTransactions = async () => {
    try {
      const storeId = localStorage.getItem("storeId");
      const data = await fetchTransactions(storeId);
      setTransactions(data);
    } catch (error) {
      alert("거래내역을 불러오지 못했습니다.");
    }
  };

  // 환불 처리 함수
  const handleRefund = async (transactionId, reason) => {
    const confirm = window.confirm("정말 이 거래를 환불하시겠습니까?");
    if (!confirm) return;

    try {
      await refundTransaction(transactionId, reason);
      alert("환불이 완료되었습니다.");
      loadTransactions(); // 다시 목록 갱신
    } catch (error) {
      alert("환불 처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 거래내역</h2>
      {transactions.length === 0 ? (
        <p>거래내역이 없습니다.</p>
      ) : (
        transactions.map((transaction) => (
          <TransactionCardCom
            key={transaction.transactionId}
            transaction={transaction}
            onRefund={handleRefund}
          />
        ))
      )}
    </div>
  );
};

export default TransactionListCon;
