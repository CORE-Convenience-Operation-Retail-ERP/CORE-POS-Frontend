import axios from "axios";

// 공공데이터포털에서 발급받은 인코딩된 API 키
const SERVICE_KEY = "275556b048794838ae7e";
const API_URL = "https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService";

export const fetchFoodProduct = async (barcode) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ServiceKey: SERVICE_KEY,
        barcode: barcode,
        returnType: "json",
      },
    });

    const items = response.data.body?.items;
    if (!items || items.length === 0) return null;

    const item = items[0];

    return {
      name: item.PRDLST_NM || "이름 없음",
      brand: item.BSSH_NM || "제조사 정보 없음",
      barcode: item.BAR_CD,
      category: item.PRDLST_DCNM,
      image: item.IMG_URL || null,
    };
  } catch (error) {
    console.error("조회 실패:", error);
    return null;
  }
};
