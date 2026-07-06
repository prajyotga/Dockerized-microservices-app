import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          🍔 FOOD DELIVERY
        </span>

        <h1>
          Fresh Food
          <br />
          <span>Delivered Fast.</span>
        </h1>

        <p>
          Order delicious meals from the best
          restaurants in your city.
          Fresh • Fast • Affordable.
        </p>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search food..."
          />

        </div>

        <button
          onClick={() => navigate("/restaurants")}
        >
          🍽 Explore Restaurants
        </button>

      </div>

      <div className="hero-right">

        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
          alt="Food"
        />

      </div>

    </section>
  );
};

export default Hero;