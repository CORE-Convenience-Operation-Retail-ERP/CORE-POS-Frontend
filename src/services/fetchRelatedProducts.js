import axiosInstance from "./axiosInstance";

const SERVICE_KEY = "275556b048794838ae7e";
const SERVICE_ID = "C005";
const API_URL = `https://openapi.foodsafetykorea.go.kr/api/${SERVICE_KEY}/${SERVICE_ID}/json/1/10`;

export const fetchRelatedProducts = async (barcode) => {
  try {
    const response = await axiosInstance.get(API_URL, {
      params: {
        BAR_CD: barcode
      }
    });

    const items = response.data?.C005?.row;
    if (!items || items.length === 0) return [];

    return items.map(item => ({
      name: item.PRDLST_NM,
      manufacturer: item.BSSH_NM,
      barcode: item.BAR_CD,
      reportNo: item.PRDLST_REPORT_NO,
    }));
  } catch (error) {
    console.error("조회 실패:", error);
    return [];
  }
};