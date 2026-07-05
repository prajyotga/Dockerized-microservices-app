import "../styles/CartCard.css";

const CartCard = ({ item, removeItem, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="cart-card">
      <img
        src={item.menuItem.image || "https://via.placeholder.com/150"}
        alt={item.menuItem.name}
        className="cart-image"
      />

      <div className="cart-content">
        <h2>{item.menuItem.name}</h2>

        <p>{item.menuItem.description}</p>

        <div className="cart-info">
          <span className="price">₹ {item.menuItem.price}</span>

          <div className="quantity-box">
            <button onClick={() => decreaseQuantity(item.menuItem._id)}>
              −
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQuantity(item.menuItem._id)}>
              +
            </button>
          </div>
        </div>
      </div>

      <button
        className="remove-btn"
        onClick={() => removeItem(item.menuItem._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;
