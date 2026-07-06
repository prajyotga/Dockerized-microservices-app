import "../styles/CartCard.css";
import { FaTrash } from "react-icons/fa";

const CartCard = ({
  item,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="cart-card">

      <img
        src={
          item.menuItem.image ||
          "https://via.placeholder.com/120"
        }
        alt={item.menuItem.name}
        className="cart-image"
      />

      <div className="cart-details">

        <div className="cart-top">

          <h3>{item.menuItem.name}</h3>

          <span className="price">
            ₹ {item.menuItem.price}
          </span>

        </div>

        <p>{item.menuItem.description}</p>

        <div className="cart-bottom">

          <div className="quantity-box">

            <button
              onClick={() =>
                decreaseQuantity(item.menuItem._id)
              }
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                increaseQuantity(item.menuItem._id)
              }
            >
              +
            </button>

          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeItem(item.menuItem._id)
            }
          >
            <FaTrash />
            Remove
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartCard;