import axios from 'axios';

export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const loadAuthHeaderFromStorage = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    setAuthHeader(token);
  }
};

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
