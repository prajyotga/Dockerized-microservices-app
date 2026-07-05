import { useNavigate } from "react-router-dom";
import "../styles/RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="restaurant-card">
      <img
        src={
          restaurant.image
            ? restaurant.image
            : "https://via.placeholder.com/400x250?text=Restaurant"
        }
        alt={restaurant.name}
        className="restaurant-image"
      />

      <div className="restaurant-content">
        <h2>{restaurant.name}</h2>

        <p className="restaurant-description">
          {restaurant.description}
        </p>

        <div className="restaurant-info">
          <span>📍 {restaurant.address}</span>

          <span className="rating">
            ⭐ {restaurant.rating}
          </span>
        </div>

        <button
          className="menu-btn"
          onClick={() =>
            navigate(`/menu/${restaurant._id}`)
          }
        >
          View Menu →
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;