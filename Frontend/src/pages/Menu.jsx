import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

import MenuCard from "../components/MenuCard";
import "../styles/Menu.css";
import { toast } from "react-toastify";

const Menu = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = async (menuItemId) => {
    try {
      console.log("Sending:", menuItemId);

      const { data } = await API.post("/cart/add", {
        menuItemId,
      });

      console.log(data);

      toast.success("Item Added To Cart");

      navigate("/cart");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      toast.error("Failed To Add Item");
    }
  };

  const fetchMenu = async () => {
    try {
      const { data } = await API.get(
        `/menu/${restaurantId}`
      );

      console.log(data);

      setMenuItems(data.menu);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="menu-page">
      <h1 className="menu-title">
        Menu
      </h1>

      {menuItems.length === 0 ? (
        <h2>No Menu Items Found</h2>
      ) : (
        <div className="menu-container">
          {menuItems.map((item) => (
            <MenuCard
              key={item._id}
              menuItem={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;