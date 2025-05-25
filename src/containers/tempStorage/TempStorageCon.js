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

    // 복원 시 보관함에서 제거
    removeTempCart(id);

    // 목록도 즉시 새로고침
    loadList();

    // 복원된 장바구니로 이동
    localStorage.setItem("restoredCart", JSON.stringify(selected.cart));
    navigate("/pos/order", { state: { fromTemp: true } });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("해당 장바구니를 삭제하시겠습니까?");
    if (!confirm) return;
    removeTempCart(id);
    loadList(); // 삭제 후 목록 새로고침
  };

  return (
    <TempCartListCom
      tempList={list}
      onRestore={handleLoad}
      onDelete={handleDelete}
    />
  );
};

export default TempStorageCon;
