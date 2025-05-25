import CartItemCom from "./CartItemCom";


const CartListCom = ({cart, onIncrease, onDecrease}) => {
  const cartItems = Object.entries(cart).map(([barcode, item]) => ({
    ...item,
    barcode,
  }));

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