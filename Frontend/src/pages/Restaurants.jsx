import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import "../styles/Restaurants.css";
import API from "../services/api";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
     const response = await API.get("/restaurants");



setRestaurants(response.data.restaurants);
setFilteredRestaurants(response.data.restaurants);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="restaurants-page">
      <h1 className="restaurants-title">Restaurants</h1>

      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      {filteredRestaurants.length === 0 ? (
        <h3>No Restaurants Found</h3>
      ) : (
        <div className="restaurants-container">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
