import axiosInstance from './axiosInstance';

// 토큰을 인스턴스에 설정
export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// localStorage에서 토큰 불러와 설정
export const loadAuthHeaderFromStorage = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    setAuthHeader(token);
  }
};

// 로그인 응답을 저장하고, axiosInstance 헤더 설정
export const saveAuthToStorage = (data) => {
  localStorage.setItem("accessToken", data.token);
  setAuthHeader(data.token); 
  
  localStorage.setItem("empId", String(data.empId));
  localStorage.setItem("empName", data.empName);
  localStorage.setItem("deptId", String(data.deptId));
  localStorage.setItem("deptName", data.deptName);
  localStorage.setItem("storeId", String(data.storeId));
  localStorage.setItem("storeName", data.storeName);
};