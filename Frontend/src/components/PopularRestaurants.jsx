import { useEffect, useState } from "react";
import API from "../services/api";
import RestaurantCard from "./RestaurantCard";
import "../styles/PopularRestaurants.css";

const PopularRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const { data } = await API.get("/restaurants");

      // Show only first 3 restaurants
      setRestaurants(data.restaurants.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <section className="popular-restaurants">

      <h2>🔥 Popular Restaurants</h2>

      <p>
        Discover some of the highest-rated restaurants
        available near you.
      </p>

      <div className="popular-grid">

        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
          />
        ))}

      </div>

    </section>
  );
};

export default PopularRestaurants;