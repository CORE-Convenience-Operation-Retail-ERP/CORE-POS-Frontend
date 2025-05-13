import React, { useState } from "react";
import { registerDisposal } from "../services/DisposalService";
import "../styles/DisposalModal.css";

const DisposalModal = ({ isOpen, onClose, productInfo }) => {
  const [form, setForm] = useState({
    disposalQuantity: 1,
    disposalReason: "유통기한만료",
    processedBy: localStorage.getItem("empName") || "점주", // 또는 localStorage.getItem("name") 등
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const quantity = parseInt(form.disposalQuantity);
    if (!quantity || quantity < 1) {
      alert("폐기 수량은 1 이상이어야 합니다.");
      return;
    }

    try {
      const disposalData = {
        stockId: productInfo.stockId,
        productId: productInfo.productId,
        proName: productInfo.proName || productInfo.name || "이름없음",
        disposalDate: new Date().toISOString(),
        disposalQuantity: quantity,
        processedBy: form.processedBy,
        totalLossAmount: productInfo.unitPrice * quantity,
        disposalReason: form.disposalReason,
      };

      console.log("🧾 전송 데이터:", disposalData);


      await registerDisposal(disposalData);
      alert("✅ 폐기 등록 완료!");
      onClose(); // 모달 닫기
    } catch (e) {
      alert("❌ 폐기 등록 실패: " + (e.response?.data || e.message));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>폐기 등록</h2>
        <p><strong>상품명:</strong> {productInfo.proName || productInfo.name || "정보 없음"}</p>
        <p><strong>단가:</strong> {(productInfo.unitPrice || 0).toLocaleString()}원</p>


        <label>
          수량:
          <input
            type="number"
            name="disposalQuantity"
            min={1}
            value={form.disposalQuantity}
            onChange={handleChange}
          />
        </label>

        <label>
          사유:
          <select name="disposalReason" value={form.disposalReason} onChange={handleChange}>
            <option value="유통기한만료">유통기한만료</option>
            <option value="파손">파손</option>
            <option value="보관불량">보관불량</option>
            <option value="기타">기타</option>
          </select>
        </label>

        <div className="modal-buttons">
          <button onClick={handleRegister}>폐기 등록</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DisposalModal;
