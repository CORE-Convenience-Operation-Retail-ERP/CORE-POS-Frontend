import axiosInstance from "./axiosInstance";

export const fetchReceipt = async (transactionId) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axiosInstance.get(`/api/pos/receipt/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("영수증 조회 실패:", error);
    throw error;
  }
};
