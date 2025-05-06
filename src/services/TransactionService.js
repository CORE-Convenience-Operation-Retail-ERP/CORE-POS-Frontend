export const fetchTransactions = async (storeId) => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await fetch(`/api/pos/transactions?storeId=${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) throw new Error("거래내역 조회 실패");
      return await response.json();
    } catch (error) {
      console.error("거래내역 조회 에러:", error);
      throw error;
    }
  };
  
export const refundTransaction = async (transactionId) => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await fetch(`/api/pos/transactions/${transactionId}/refund`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) throw new Error("환불 실패");
    } catch (error) {
      console.error("환불 요청 에러:", error);
      throw error;
    }
};
  