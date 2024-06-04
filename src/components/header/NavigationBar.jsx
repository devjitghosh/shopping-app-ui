import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
function NavigationBar() {
  return (
    <nav id="navigation-bar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
            end
          >
            products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products/1"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
            end
          >
            product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
