import api from "./axiosInstance";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
});

// 일별 정산 요청
export const requestDailySettlement = async (payload) => {
  const response = await api.post("/api/pos/settlement/daily", {
    ...payload,
    type: (payload.type || "DAILY").toUpperCase()
  }, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// 교대 정산 요청
export const requestShiftSettlement = async (payload) => {
  const response = await api.post("/api/pos/settlement/shift", {
    ...payload,
    type: payload.type?.toUpperCase()
  }, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// 월별 정산 요청
export const requestMonthlySettlement = async (payload) => {
  const response = await api.post("/api/pos/settlement/monthly", {
    ...payload,
    type: payload.type?.toUpperCase()
  }, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// 연별 정산 요청
export const requestYearlySettlement = async (payload) => {
  const response = await api.post("/api/pos/settlement/yearly", {
    ...payload,
    type: payload.type?.toUpperCase()
  }, {
    headers: getAuthHeaders()
  });
  return response.data;
};


// 정산 미리보기 요청 (일별만 해당)
export const fetchSettlementPreview = async (storeId, targetDate) => {
  const response = await api.get("/api/pos/settlement/preview", {
    params: { storeId, targetDate },
    headers: getAuthHeaders()
  });
  return response.data;
};

// 최근 정산 내역 조회
export const fetchRecentSettlements = async (storeId) => {
  const response = await api.get(`/api/pos/settlement/recent/${storeId}`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

// 아르바이트 목록 조회 (교대 정산용)
export const fetchPartTimerList = async () => {
    const response = await api.get("/api/store/parttimer/dropdown", {
      headers: getAuthHeaders()
    });
    return response.data;
};
  
