import "./Product.css";
import ButtonWrapper from "../ButtonWrapper";
const Product = ({ product, addItemToCart }) => {
  const pid = product._id;
  return (
    <li className="product">
      <img
        className="product-image"
        src={`http://localhost:3000/${pid}/tn.webp`}
        alt={`image of tshirt ${pid}`}
      ></img>
      <div className="info">
        <div className="product-name">{product.name}</div>
        <div className="price-addtocart">
          <div className="price">
            <span style={{ fontSize: "small" }}>₹ </span>
            {product.price}
          </div>
          <ButtonWrapper
            customClassName="add-to-cart"
            clickHandler={(event) => addItemToCart(pid)}
          >
            {"🛒 Add To Cart"}
          </ButtonWrapper>
        </div>
      </div>
    </li>
  );
};

export default Product;
