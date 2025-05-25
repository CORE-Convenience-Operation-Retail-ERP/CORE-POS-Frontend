import React from "react";
import TempCartItemCom from "./TempCartItemCom";

const TempCartListCom = ({ tempList, onRestore, onDelete }) => {
  if (!tempList || tempList.length === 0) {
    return <p style={{ textAlign: "center", color: "#999" }}>🪹 저장된 장바구니가 없습니다.</p>;
  }

  return (
    <div>
      {tempList.map((item) => (
        <TempCartItemCom
          key={item.id}
          item={item}
          onRestore={onRestore}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TempCartListCom;
