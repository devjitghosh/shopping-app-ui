import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./components/filters/Filters";
import ProductList from "./components/product/ProductList";

function App() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    async function getItems() {
      const itemsData = await axios.get(
        `http://localhost:3000/items?price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
      );
      setProducts(itemsData.data.body.items);
      setIsProductLoading(false);
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
    <div id="whole-page">
      <Header cart={cart} setCart={setCart}></Header>
      <div id="main-page">
        <Filters
          setPriceRangeHandler={setPriceRangeHandler}
          filterHandler={filterHandler}
        />
        <div id="main-section">
          <ProductList
            products={products}
            addItemToCartHandler={addItemToCartHandler}
            isLoading={isProductLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
