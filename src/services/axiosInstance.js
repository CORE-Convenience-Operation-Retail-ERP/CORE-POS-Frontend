import axios from "axios";

const api = axios.create({
  baseURL: "https://oxox2.fly.dev", // ⬅️ 여기에 Fly.io 주소!
  withCredentials: true, // 쿠키 필요 시 유지
});

export default api;
