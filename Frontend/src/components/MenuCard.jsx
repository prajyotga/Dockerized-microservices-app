import "../styles/MenuCard.css";

const MenuCard = ({ menuItem, addToCart }) => {
  return (
    <div className="menu-card">
      <img
        src={
          menuItem.image
            ? menuItem.image
            : "https://via.placeholder.com/400x250?text=Food"
        }
        alt={menuItem.name}
        className="menu-image"
      />

      <div className="menu-content">
        <h2>{menuItem.name}</h2>

        <p className="menu-description">
          {menuItem.description}
        </p>

        <div className="menu-info">
          <span className="price">
            ₹ {menuItem.price}
          </span>

          <span className="category">
            {menuItem.category}
          </span>
        </div>

        <button
          className="cart-btn"
          onClick={() => addToCart(menuItem._id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;