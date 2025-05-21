import api from './axiosInstance';

export const registerDisposal = async (disposalData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/api/pos/disposals", disposalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ 폐기 등록 실패:", error.response?.data || error.message);
    throw error;
  }
};

