import axios from "axios";

export const savePayment = async (paymentData) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.post(
            `/api/pos/pay`,
            paymentData,
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("결제 저장 실패:", error);
        throw new Error("결제 정보를 저장하는 데 실패했습니다.");
    }
}