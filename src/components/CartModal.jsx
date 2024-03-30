import { useRef, forwardRef, useEffect, useState } from "react";
import "./CartModal.css";
import { createPortal } from "react-dom";
import ButtonWrapper from "./ButtonWrapper";
import axios from "axios";

const CartModal = forwardRef(function CartModal({ cart, setCart }, ref) {
  const cartItems = [];
  const [cartProducts, setCartProducts] = useState([]);

  console.log("CART:", cart);
  useEffect(() => {
    console.log("CA:", cart);
    const getItems = async () => {
      const itemData = await axios.get(
        `http://localhost:3000/items?ids=${Object.keys(cart).join(",")}`
      );
      console.log("itemData.data", itemData.data);
      setCartProducts(itemData.data.body.items);
    };
    getItems();
  }, [cart]);

  const clickHandler = async (id, operation) => {
    console.log(id, operation);
    const result = await axios.put("http://localhost:3000/update-cart-item", {
      productId: id,
      userName: "abc@def.com",
      operation,
    });
    setCart((previousCart) => {
      console.log("pervcartCM:", previousCart);
      const newCart = { ...previousCart };

      if (operation === "INC") {
        newCart[id] += 1;
      } else {
        newCart[id] -= 1;
      }
      if(!newCart[id]) {
        delete newCart[id]
      }
      return newCart;
    });
  };

  for (let id in cart) {
    console.log("CP:", cartProducts);
    const product = cartProducts.filter((prd) => prd._id == id)[0];
    console.log("prod", product, "id", id);
    if (product) {
      cartItems.push(
        <div className="cart-item" key={id}>
          <img
            src={`http://localhost:3000/${product._id}/tn.webp`}
            alt={`image of tshirt ${product._id}`}
          />
          <p>name: {product.name}</p>
          <p>price: {product.price}</p>
          <p>total: {product.price * cart[id]}</p>
          <div className="item-count">
            <ButtonWrapper
              customClassName="product-inc"
              clickHandler={() => {
                clickHandler(id, "INC");
              }}
            >
              +
            </ButtonWrapper>
            <div>
              <p>{cart[id]}</p>
            </div>
            <ButtonWrapper
              customClassName="product-dec"
              clickHandler={() => {
                clickHandler(id, "DEC");
              }}
            >
              -
            </ButtonWrapper>
          </div>
        </div>
      );
    }
  }

  return createPortal(
    <dialog id="cart-modal" ref={ref}>
      {cartItems}
      <form method="dialog">
        <ButtonWrapper>Close</ButtonWrapper>
      </form>
    </dialog>,

    document.getElementById("modal-portal")
  );
});

export default CartModal;
