import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTransactions, refundTransaction } from "../../services/TransactionService";
import TransactionGroupCom from "../../components/transaction/TransactionGroupCom";
import TransactionFilterModal from "../../components/transaction/TransactionFilterModal";

const TransactionListCon = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [customDates, setCustomDates] = useState({ from: null, to: null });
  // 거래내역 가져오기
  const loadTransactions = async () => {
    try {
      setLoading(true);
      const storeId = localStorage.getItem("storeId");
      const data = await fetchTransactions(storeId);

      setTransactions(data || []);
    } catch (error) {
      alert("거래내역을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 환불 처리 함수
  const handleRefund = async (transactionId, reason) => {
    const confirm = window.confirm("정말 이 거래를 환불하시겠습니까?");
    if (!confirm) return;

    try {
      await refundTransaction(transactionId, reason);
      alert("환불이 완료되었습니다.");
      loadTransactions();
    } catch (error) {
      alert("환불 처리 중 오류가 발생했습니다.");
    }
  };

  const groupByDate = (data) => {
    const grouped = {};
    for (const tx of data) {
      const date = new Date(tx.paidAt).toLocaleDateString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(tx);
    }
    return grouped;
  };

  const applyFilter = (type, from, to) => {
    setFilterOption(type);
    setCustomDates({ from, to });
    setShowFilter(false);
  };

  const getFilteredTransactions = () => {
    if (filterOption === "all") return transactions;
    if (!customDates.from || !customDates.to) return transactions;
    return transactions.filter(tx => {
      const date = new Date(tx.paidAt);
      const txDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const fromDate = new Date(customDates.from.getFullYear(), customDates.from.getMonth(), customDates.from.getDate());
      const toDate = new Date(customDates.to.getFullYear(), customDates.to.getMonth(), customDates.to.getDate());
      return txDate >= fromDate && txDate <= toDate;
    });
  };

  const grouped = groupByDate(getFilteredTransactions());
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  useEffect(() => {
    loadTransactions();
  }, []);

  // 정산 관리 페이지로 이동 함수
  const handleGoToSettlement = () => {
    navigate("/pos/settlement");
  };

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setShowFilter(true)}
            style={{
              backgroundColor: "#f3f4f6",
              border: "1px solid #ccc",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            📅 날짜 필터
          </button>
  
          <button
            onClick={handleGoToSettlement}
            style={{
              backgroundColor: "#3f3f3f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            📊 정산 관리
          </button>
        </div>
      </div>
  
  

      {loading ? (
        <p style={{ textAlign: "center" }}>📦 거래내역 불러오는 중...</p>
      ) : sortedDates.length === 0 ? (
        <p style={{ textAlign: "center" }}>🪹 거래내역이 없습니다.</p>
      ) : (
        sortedDates.map((date) => (
          <TransactionGroupCom
            key={date}
            date={date}
            transactions={grouped[date]}
            onRefund={handleRefund}
          />
        ))
      )}

      {showFilter && (
        <TransactionFilterModal
          onApply={applyFilter}
          onClose={() => setShowFilter(false)}
          defaultFrom={customDates.from || new Date()}
          defaultTo={customDates.to || new Date()}
        />
      )}
    </div>
  );
};

export default TransactionListCon;
