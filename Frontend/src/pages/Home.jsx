import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">

      <h1 className="display-4 fw-bold text-danger">
        🍔 Food Delivery
      </h1>

      <p className="lead mt-4">
        Delicious food delivered to your doorstep.
      </p>

      <p className="text-secondary">
        Order from your favourite restaurants with
        fast delivery and secure online payments.
      </p>

      <button
        className="btn btn-warning btn-lg mt-3"
        onClick={() => navigate("/restaurants")}
      >
        Explore Restaurants
      </button>

    </div>
  );
};

export default Home;