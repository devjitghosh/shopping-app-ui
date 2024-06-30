import { Link, useRouteError } from "react-router-dom";
import Header from "../components/header/Header";

function ErrorPage({ cart, setCart }) {
  const error = useRouteError();
  console.log("ROUTER ERROR:", error);
  let message = "An Error Occcured";
  let status = 500;
  if (error.data.message) message = error.data.message;
  if (error.status) status = error.status;
  return (
    <div style={{ margin: "100px" }}>
      <Header cart={cart} setCart={setCart} />
      <h1>{message}</h1>
      <h2>status code: {status}</h2>
      <h1>
        {" "}
        Go to home: <Link to="/">HOME</Link>
      </h1>
    </div>
  );
}

export default ErrorPage;
