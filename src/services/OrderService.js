import axiosInstance from "./axiosInstance";

const BASE_URL = "https://api.example.com/products"; // 실제 API 주소로 대체하세요

const OrderService = {
  async getProductByBarcode(barcode) {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/barcode/${barcode}`);
      return response.data;
    } catch (error) {
      console.error("❌ 바코드 조회 API 실패:", error);
      throw error;
    }
  },

  async createOrder(cart) {
    const items = Object.entries(cart).map(([barcode, item]) => ({
      productId: item.productId,
      stockId: item.stockId,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axiosInstance.post("/api/order", { items });
      return response.data;
    } catch (error) {
      console.error("❌ 주문 생성 실패:", error);
      throw error;
    }
  },
};

export default OrderService;
