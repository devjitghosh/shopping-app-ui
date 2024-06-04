import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function MainLayout({ cart, setCart }) {
  console.log("MLC:", cart);
  return (
    <>
      <Header cart={cart} setCart={setCart} />
      <Outlet />
    </>
  );
}

export default MainLayout;
