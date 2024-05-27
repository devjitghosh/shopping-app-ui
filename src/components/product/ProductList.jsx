import Product from "./Product";
import "./ProductList.css";
function ProductList({ products, addItemToCartHandler, isLoading }) {
  if (isLoading) {
    return <p className="fallback-text"> LOADING PRODUCTS !! </p>;
  }
  if (products.length === 0) {
    return <p className="fallback-text"> NO PRODUCTS FOUND :( </p>;
  }
  return (
    <ul id="main-card">
      {products.map((item) => (
        <Product
          product={item}
          key={item._id}
          addItemToCart={addItemToCartHandler}
        />
      ))}
    </ul>
  );
}

export default ProductList;
