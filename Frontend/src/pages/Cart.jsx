import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CartCard from "../components/CartCard";
import "../styles/Cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");

      console.log(data);

      setCart(data.cart);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (menuItemId) => {
    try {
      await API.delete(`/cart/${menuItemId}`);

      toast.error("Item removed");

      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const increaseQuantity = async (menuItemId) => {
  try {
    await API.patch(`/cart/increase/${menuItemId}`);

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

const decreaseQuantity = async (menuItemId) => {
  try {
    await API.patch(`/cart/decrease/${menuItemId}`);

    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

  const placeOrder = async () => {
    try {
      const { data } = await API.post("/orders");

      console.log(data.orders);

      toast.success("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      total.error("Failed to place order");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2>Your Cart is Empty</h2>;
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.menuItem.price * item.quantity;
  }, 0);


    return (
  <div className="cart-page">

    <div className="cart-left">

      <h1 className="cart-title">🛒 My Cart</h1>

      <div className="cart-container">
        {cart.items.map((item) => (
          <CartCard
            key={item._id}
            item={item}
            removeItem={removeItem}
            increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
          />
        ))}
      </div>

    </div>

    <div className="cart-summary">

      <h2>Order Summary</h2>

      <hr />

      <div className="summary-row">
        <span>Items</span>

        <span>{cart.items.length}</span>
      </div>

      <div className="summary-row">
        <span>Total</span>

        <span>₹ {total}</span>
      </div>

      <div className="summary-row">
        <span>Delivery Fee</span>

        <span>₹ 40</span>
      </div>

      <hr />

      <div className="summary-row total">
        <span>Grand Total</span>

        <span>₹ {total + 40}</span>
      </div>

      <button
        className="order-btn"
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>

  </div>
);
 
};

export default Cart;