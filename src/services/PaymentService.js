import axiosInstance from "./axiosInstance";

export const savePayment = async (paymentData) => {
    try {
        const token = localStorage.getItem("token");
        console.log("💳 [결제 요청 DTO 전송 전] paymentData:", JSON.stringify(paymentData, null, 2));

        const response = await axiosInstance.post(
            `/api/pos/pay`,
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("✅ [서버 응답] 결제 저장 성공:", response.data);

        return response.data;
    } catch (error) {
        console.error("결제 저장 실패:", error);
        throw new Error("결제 정보를 저장하는 데 실패했습니다.");
    }
}