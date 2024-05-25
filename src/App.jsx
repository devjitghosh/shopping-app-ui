import "./App.css";
import Product from "./components/Product";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonWrapper from "./components/ButtonWrapper";
import PriceRange from "./components/filters/PriceRange";

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    async function getItems() {
      const itemsData = await axios.get(
        `http://localhost:3000/items?price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
      );
      setProducts(itemsData.data.body.items);
    }
    getItems();
  }, []);

  useEffect(() => {
    async function getCartItems() {
      const cartItemsData = await axios.get(
        "http://localhost:3000/cart-items?username=abc@def.com"
      );
      setCart(cartItemsData.data.body.products);
    }
    getCartItems();
  }, []);

  const addItemToCartHandler = async (id) => {
    setCart((previousCart) => {
      const newCart = { ...previousCart };

      if (newCart[id]) {
        newCart[id] += 1;
      } else {
        newCart[id] = 1;
      }
      return newCart;
    });

    // save data to db
    const resp = await axios.post("http://localhost:3000/addtocart", {
      productId: id,
      userName: "abc@def.com",
    });
  };
  const setPriceRangeHandler = (value, thumbIndex) => {
    setPriceRange(value);
  };
  const filterHandler = async () => {
    const itemsData = await axios.get(
      `http://localhost:3000/items?price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
    );
    setProducts(itemsData.data.body.items);
  };
  return (
    <div id="main-page">
      <div id="filter-section">
        <PriceRange priceRangeHandler={setPriceRangeHandler} />
        <div id="filter-button">
          <ButtonWrapper clickHandler={filterHandler}>FILTER</ButtonWrapper>
        </div>
      </div>
      <div id="main-section">
        <Header cart={cart} setCart={setCart}></Header>
        <div id="main-card">
          {products.length ? (
            products.map((item) => (
              <Product
                product={item}
                key={item._id}
                addItemToCart={addItemToCartHandler}
              />
            ))
          ) : (
            <p>No Items Found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
