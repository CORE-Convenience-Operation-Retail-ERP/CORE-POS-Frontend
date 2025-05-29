import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TempCartListCom from "../../components/tempStorage/TempCartListCom";
import {
  getTempCartList,
  removeTempCart,
  getTempCartById,
} from "../../services/tempStorageService";

const TempStorageCon = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const loadList = () => {
    const carts = getTempCartList();
    setList(carts);
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleLoad = (id) => {
    const selected = getTempCartById(id);
    if (!selected) {
      alert("장바구니를 불러오지 못했습니다.");
      return;
    }

    removeTempCart(id);
    loadList();

    localStorage.setItem("restoredCart", JSON.stringify(selected.cart));
    navigate("/pos/order", { state: { fromTemp: true } });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("해당 장바구니를 삭제하시겠습니까?");
    if (!confirm) return;
    removeTempCart(id);
    loadList();
  };

  // 빈 목록일 경우 overflow 제거
  const wrapperStyle = {
    padding: "20px",
    overflowY: list.length === 0 ? "hidden" : "auto",
  };

  return (
    <div style={wrapperStyle}>
      <TempCartListCom
        tempList={list}
        onRestore={handleLoad}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TempStorageCon;
