import { useEffect, useState } from "react";
import API from "../services/api";
import OrderCard from "../components/OrderCard";
import "../styles/Orders.css";
import { toast } from "react-toastify";

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
      toast.error("Failed to get orders data");
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (orderId) => {
    try {
      const { data } = await API.post("/payment/create", {
        orderId,
      });

      console.log(data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.razorPayOrder.amount,

        currency: data.razorPayOrder.currency,

        description: "Food Order Payment",

        name: "Food Delivery",

        order_id: data.razorPayOrder.id,

        handler: async function (response) {
          try {
            console.log(response);

            const { data } = await API.post(
              "/payment/verify",
              {
                orderId,
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            console.log(data);

            toast.success("Payment Successful");

            fetchOrder();
          } catch (error) {
            console.log(error);

            toast.error("Payment Verification Failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="orders-page">

      <h1 className="orders-title">
        My Orders
      </h1>

      <div className="orders-container">

        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            createPayment={createPayment}
          />
        ))}

      </div>

    </div>
  );
};

export default Orders;