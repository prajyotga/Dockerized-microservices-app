import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import "../styles/Restaurants.css";
import API from "../services/api";
import { toast } from "react-toastify";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const { data } = await API.get("/restaurants");
      console.log(data);

      setRestaurants(data.restaurants);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="restaurants-page">
      <h1 className="restaurants-title">
        Restaurants
      </h1>

      {restaurants.length === 0 ? (
        <h3>No Restaurants Found</h3>
      ) : (
        <div className="restaurants-container">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;