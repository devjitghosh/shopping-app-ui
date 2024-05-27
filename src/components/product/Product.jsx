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
        <div>
          <p className="product-info">{product.name}</p>
        </div>
        <div className="price-addtocart">
          <p className="product-info price">Rs: {product.price}</p>
          <ButtonWrapper
            className="add-to-cart"
            clickHandler={(event) => addItemToCart(pid)}
          >
            Add To Cart
          </ButtonWrapper>
        </div>
      </div>
    </li>
  );
};

export default Product;
