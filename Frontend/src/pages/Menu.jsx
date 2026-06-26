import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const Menu = () => {
  const navigate = useNavigate();

  const { restaurantId } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const addtocart = async (menuItemId) => {
    try {
        console.log("Sending:", menuItemId);
      const { data } = await API.post("/cart/add", { menuItemId });
      console.log(data);
     

      alert("Item Added To Cart");
      navigate("/cart");
    } catch (error) {
        console.log(error);
  console.log(error.response?.data);

  alert("Failed To Add Item");
    }
  };

  const fetchMenu = async (req, res) => {
    try {
      const { data } = await API.get(`/menu/${restaurantId}`);

      console.log(data);
      setMenuItems(data.menu);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch menu");
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
    <div>
      <h1>Menu</h1>
      {menuItems.length === 0 ? (
        <h1>No menu items in this restauarant</h1>
      ) : (
        menuItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid black",
              padding: "15px",
              margin: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{item.name}</h2>

            <p>{item.description}</p>

            <p>Category: {item.category}</p>

            <p>₹ {item.price}</p>

            <button onClick={() => addtocart(item._id)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Menu;
