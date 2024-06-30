import "./Product.css";
import ButtonWrapper from "../ButtonWrapper";
import { useNavigate } from "react-router-dom";
const Product = ({ product, addItemToCart }) => {
  const pid = product._id;
  const navigate = useNavigate();
  const handleProductNavigation = (product) => {
    console.log(pid);
    // navigate(product._id + "", { state: { product } });
    navigate(product._id + `?name=${product.name}&price=${product.price}`);
  };
  return (
    <li className="product">
      <div onClick={handleProductNavigation.bind(null, product)}>
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
      </div>
    </li>
  );
};

export default Product;
