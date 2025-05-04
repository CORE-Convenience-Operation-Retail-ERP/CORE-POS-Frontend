import axios from "axios"

export const loginRequest = async (loginData) => {
    try {
        const response = await axios.post("/api/auth/login", loginData);
        const data = response.data;

        if(data.deptId !== 3) {
            throw new Error("POS는 점주 계정으로만 로그인할 수 있습니다.")
        }

        return data;
    } catch (error) {
        const message = 
        error.response?.data?.message || error.message || "로그인에 실패했습니다.";
        throw new Error(message);
    }
};