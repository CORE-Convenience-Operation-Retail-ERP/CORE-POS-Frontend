import CartItemCom from "./CartItemCom";

const CartListCom = ({cart, onIncrease, onDecrease}) => {
  const cartItems = Object.entries(cart).map(([barcode, item]) => ({
    ...item,
    barcode,
  }));

  if (cartItems.length === 0) {
    return <p>🛒 장바구니가 비어 있습니다.</p>;
  }
    return(
      <div style={{ marginBottom: '20px' }}>
      {cartItems.map((item) => (
        <CartItemCom
          key={item.barcode}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
};
  export default CartListCom;