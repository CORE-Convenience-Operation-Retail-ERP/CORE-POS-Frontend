import axios from "axios";

// 환경변수에서 API Base URL 가져오기
const baseURL = process.env.REACT_APP_API_BASE_URL;
console.log("✅ axios baseURL:", baseURL);

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
