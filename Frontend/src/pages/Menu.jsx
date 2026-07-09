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
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const addToCart = async (menuItemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to add items to cart");
      navigate("/login", {
        state: { from: `/menu/${restaurantId}`, pendingItem: menuItemId },
      });
      return;
    }

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
      const { data } = await API.get(`/menu/${restaurantId}`);

      console.log(data);

      setMenuItems(data.menu);
      setFilteredMenu(data.menu);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredMenu(menuItems);

      return;
    }

    const filtered = menuItems.filter((item) => item.category === category);

    setFilteredMenu(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        (selectedCategory === "All" || item.category === selectedCategory),
    );

    setFilteredMenu(filtered);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="menu-page">
      <h1 className="menu-title">Menu</h1>
      <div className="menu-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {menuItems.length === 0 ? (
        <h2>No Menu Items Found</h2>
      ) : (
        <div className="menu-container">
          {menuItems.map((item) => (
            <MenuCard key={item._id} menuItem={item} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
