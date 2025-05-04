export const saveAuthToStorage = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("empId", String(data.empId));
    localStorage.setItem("empName", data.empName);
    localStorage.setItem("deptId", String(data.deptId));
    localStorage.setItem("deptName", data.deptName);
    localStorage.setItem("storeId", String(data.storeId));
    localStorage.setItem("storeName", data.storeName);
};