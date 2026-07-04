import { NavLink, useNavigate } from "react-router-dom";
import { FaHamburger, FaShoppingCart, FaClipboardList, FaSignOutAlt, FaHome } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaHamburger /> Food Delivery
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          🍽 Restaurants
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaShoppingCart /> Cart
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaClipboardList /> Orders
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;