import React, {  useState } from 'react'
import { useEffect } from 'react'
import API from "../services/api";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate=useNavigate();

const [cart,setCart]=useState(null);
const [loading,setLoading]=useState(true);

  const fetchCart=async ()=>{

  try{
      const {data}= await API.get("/cart");

      
    console.log(data);
    setCart(data.cart);
  }catch(error){
     console.log(error);
      alert("Failed to fetch cart items");
  }finally {
      setLoading(false);
    }


  };

  const removeItem=async (menuItemId)=>{

    try{

      await API.delete(`/cart/${menuItemId}`) ;

      alert("item removed");
      fetchCart();

    }catch (error) {
      console.log(error);
    }
  }


  const placeOrder=async ()=>{
    try{

      const {data}=await API.post("/orders");
      console.log(data);

alert("order palced succesfully");

navigate("/orders");

    }catch(error){
     console.log(error);
      alert("Failed to place order");
  }finally {
      setLoading(false);
    }
    
  }

   useEffect(()=>{
    fetchCart();
  },[]);

   if (loading) {
    return <h2>Loading...</h2>;
  }


  if (!cart || cart.items.length === 0) {
    return <h2>Your Cart is Empty</h2>;
  }

  const total=cart.items.reduce((sum,item)=>{
    return sum+item.menuItem.price*item.quantity;
  },0)

 





  return (
     <div>
      <h1>My Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.menuItem._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{item.menuItem.name}</h2>

          <p>{item.menuItem.description}</p>

          <p>₹ {item.menuItem.price}</p>

          <p>Quantity : {item.quantity}</p>

          <button
            onClick={() =>
              removeItem(item.menuItem._id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <hr />

      <h2>Total : ₹ {total}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  )
}

export default Cart