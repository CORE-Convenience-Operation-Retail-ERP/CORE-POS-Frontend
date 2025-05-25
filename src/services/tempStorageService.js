// 저장 키 상수
const STORAGE_KEY = "tempCartList";

// 1. 임시 장바구니 저장
export const saveTempCart = (cart) => {
  const now = new Date();
  const id = now.getTime(); // 고유 ID
  const savedAt = now.toISOString();

  const newEntry = {
    id,
    savedAt,
    cart,
  };

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const updated = [...existing, newEntry];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// 2. 저장된 장바구니 전체 조회
export const getTempCartList = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// 3. 특정 장바구니 복원
export const getTempCartById = (id) => {
  const list = getTempCartList();
  return list.find((entry) => entry.id === id);
};

// 4. 특정 장바구니 삭제
export const removeTempCart = (id) => {
  const list = getTempCartList();
  const updated = list.filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// 5. 전체 삭제 (선택 기능)
export const clearAllTempCart = () => {
  localStorage.removeItem(STORAGE_KEY);
};
