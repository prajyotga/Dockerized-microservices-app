import "../styles/OrderCard.css";

const OrderCard = ({ order, createPayment }) => {
  return (
    <div className="order-card">

      <div className="order-header">

        <div>
          <h3>
            Order #{order._id.slice(-6)}
          </h3>

          <p>
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`status ${order.status.toLowerCase()}`}
        >
          {order.status}
        </span>

      </div>

      <hr />

      {order.items.map((item) => (
        <div
          key={item._id}
          className="order-item"
        >
          <div>
            <h4>{item.menuItem.name}</h4>

            <p>{item.menuItem.description}</p>
          </div>

          <div className="item-right">
            <p>₹ {item.menuItem.price}</p>

            <p>Qty : {item.quantity}</p>
          </div>
        </div>
      ))}

      <hr />

      <div className="order-footer">

        <p>
          <strong>Total :</strong> ₹
          {order.totalAmount}
        </p>

        <p>
          <strong>Payment :</strong>{" "}
          <span
            className={
              order.paymentStatus === "Paid"
                ? "paid"
                : "pending"
            }
          >
            {order.paymentStatus}
          </span>
        </p>

      </div>

      {order.paymentStatus === "Pending" && (
        <button
          className="pay-btn"
          onClick={() =>
            createPayment(order._id)
          }
        >
          Pay Now
        </button>
      )}

    </div>
  );
};

export default OrderCard;