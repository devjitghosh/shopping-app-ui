import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import MainLayout from "./pages/MainLayout";
import useFetch from "./customhooks/useFetch";
import axios from "axios";

function App() {
  const {
    data: cart,
    setData: setCart,
    isDataLoading: isCartLoading,
    setIsDataLoading: setIsCartLoading,
  } = useFetch(async () => {
    const cartItemsData = await axios.get(
      "http://localhost:3000/cart-items?username=abc@def.com"
    );
    setCart(cartItemsData.data.body.products);
    setIsCartLoading(false);
  });

  // const addItemToCartHandler = async (id) => {
  //   setCart((previousCart) => {
  //     const newCart = { ...previousCart };

  //     if (newCart[id]) {
  //       newCart[id] += 1;
  //     } else {
  //       newCart[id] = 1;
  //     }
  //     return newCart;
  //   });

  //   // save data to db
  //   const resp = await axios.post("http://localhost:3000/addtocart", {
  //     productId: id,
  //     userName: "abc@def.com",
  //   });
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout cart={cart} setCart={setCart} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/products", element: <ProductsPage setCart={setCart} /> },
        { path: "/products/:productId", element: <ProductDetailsPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
