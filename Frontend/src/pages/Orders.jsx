import { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get("/orders");

      console.log(data);

      setOrders(data.orders);
    } catch (err) {
      console.log(err);
      alert("Failed to get orders data");
    } finally {
      setLoading(false);
    }
  };

  const createPayment=async (orderId)=>{
   try{

    const {data}=await API.post("/payment/create",{orderId});
    console.log(data);


     const options ={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:data.razorPayOrder.amount,
    currency:data.razorPayOrder.currency,
    description:"Food Order Payment",
    name:"Food Delivery",
    order_id:data.razorPayOrder.id,
     handler: async function (response) {
        console.log(response);

        // We will verify the payment here
      },

  }


  const razorpay = new window.Razorpay(options);

razorpay.open(); 

   }catch (error) {
    console.log(error);
  }
  }

 

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (orders.length === 0) {
    return <h2>No Orders Found</h2>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            margin: "15px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>Order ID: {order._id}</h2>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>

          <hr />

          <h3>Items</h3>

          {order.items.map((item) => (
            <div
              key={item._id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid gray",
              }}
            >
              <h4>{item.menuItem.name}</h4>

              <p>{item.menuItem.description}</p>

              <p>Price: ₹{item.menuItem.price}</p>

              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          {order.paymentStatus === "Pending" && (
            <button  onClick={()=>{createPayment(order._id)}}>
              Pay Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;