import { useRef, forwardRef, useEffect, useState } from "react";
import "./CartModal.css";
import { createPortal } from "react-dom";
import ButtonWrapper from "./ButtonWrapper";
import axios from "axios";
import deleteIcon from "../assets/deleteicon.png";
import RemoveItemModal from "./RemoveItemModal";

const CartModal = forwardRef(function CartModal({ cart, setCart }, ref) {
  const cartItems = [];
  const [cartProducts, setCartProducts] = useState([]);
  const [idToBeDeleted, setIdToBeDeleted] = useState(-1);
  const dialog = useRef();

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

  const deleteItemHandler = async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/delete-cart-item?productId=${id}&userName=abc@def.com`
    );
    if (result.status === 200) {
      console.log("CART:::", cart);
      setCart((prevcart) => {
        const newCart = { ...prevcart };
        delete newCart[id];
        return newCart;
      });
    }
    dialog.current.close();
  };

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
      if (!newCart[id]) {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const removeItemHandler = (id) => {
    setIdToBeDeleted(id);
    dialog.current.showModal();
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
            className="prod-image"
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
          <div>
            <img
              src={deleteIcon}
              height="2px"
              width="2px"
              className="delete-icon"
              onClick={() => removeItemHandler(id)}
              item={product}
            ></img>
          </div>
        </div>
      );
    }
  }

  return createPortal(
    <>
      <RemoveItemModal
        ref={dialog}
        deleteItemHandler={deleteItemHandler}
        id={idToBeDeleted}
      />
      <dialog id="cart-modal" ref={ref}>
        {cartItems}
        <form method="dialog">
          <ButtonWrapper>Close</ButtonWrapper>
        </form>
      </dialog>
    </>,

    document.getElementById("modal-portal")
  );
});

export default CartModal;
