import api from "./axiosInstance";

// 거래내역 조회
export const fetchTransactions = async (storeId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await api.get(`/api/pos/transactions?storeId=${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ 거래내역 조회 에러:", error);
    throw new Error("거래내역을 불러오지 못했습니다.");
  }
};

  
// 거래 환불 요청
export const refundTransaction = async (transactionId, refundReason) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await api.post(
      `/api/pos/refund/${transactionId}?refundReason=${encodeURIComponent(refundReason)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ 환불 요청 에러:", error);
    throw new Error("환불 요청에 실패했습니다.");
  }
};
  