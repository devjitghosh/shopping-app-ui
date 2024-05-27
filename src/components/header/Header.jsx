import "./Header.css";
import cartIcon from "../../assets/cart-icon.png";
import logo from "../../assets/cotton-brandy.png";
import { useRef } from "react";
import CartModal from "./CartModal";

const Header = ({ cart, setCart }) => {
  const modal = useRef();

  let count = 0;
  for (let id in cart) {
    count += cart[id];
  }
  const clickHandler = (evnt) => {
    modal.current.showModal();
  };
  return (
    <div id="header">
      {/* <p>{JSON.stringify(cart)}</p> */}
      <img className="logo" src={logo}></img>
      <div id="complete-cart">
        <CartModal ref={modal} cart={cart} setCart={setCart} />

        <img className="cart-icon" src={cartIcon} onClick={clickHandler}></img>
        {count > 0 ? <div id="counter">{count}</div> : ""}
      </div>
    </div>
  );
};

export default Header;
