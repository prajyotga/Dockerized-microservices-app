import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Restaurants = () => {
    const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([""]);
  const [loading,setLoading]=useState(false);

  const fetchRestaurants = async () => {
    try {
      const { data } = await  API.get("/restaurants");
      console.log(data);

      setRestaurants(data.restaurants);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }


   

     if (loading) {
    return <h2>Loading...</h2>;
  }
  };

   useEffect(()=>{
        fetchRestaurants();
    },[]);
  return (
    <div>
      <h1>Restaurants</h1>

      {restaurants.length===0?(<h3>No restaurants found</h3>):
      ( restaurants.map((restaurant) => (
              

              <div
            key={restaurant._id}
            style={{
              border: "1px solid black",
              padding: "15px",
              margin: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{restaurant.name}</h2>

            <p>
              <strong>Description:</strong>{" "}
              {restaurant.description}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {restaurant.address}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {restaurant.rating}
            </p>

            {restaurant.image && (
              <img
                src={restaurant.image}
                alt={restaurant.name}
                width="250"
              />
            )}

            <br />
            <br />

            <button
              onClick={() =>
                navigate(
                  `/menu/${restaurant._id}`
                )
              }
            >
              View Menu
            </button>
          </div>

      )))}
    </div>
  );
};

export default Restaurants;
