import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Menu = () => {

  const {restaurantId}=useParams();

  const [menuItems,setMenuItems]=useState([]);
  const [loading,setLoading]=useState(false);

const fetchMenu=async (req,res)=>{

try{
    const{data}=await API.get(`/menu/${restaurantId}`);

    console.log(data);
  setMenuItems(data.menu);
}
catch (error) {
      console.log(error);
      alert("Failed to fetch menu");
    } finally {
      setLoading(false);
    }

}

useEffect(()=>{
fetchMenu()
},[]);

 if (loading) {
    return <h2>Loading...</h2>;
  }

  
  return (
    <div>
      <h1>Menu</h1>
      {menuItems.length===0 ?(
        <h1>No menu items in this restauarant</h1>
      ):
      (menuItems.map((item)=>(
        <div
        key={item._id}
          style={{
              border: "1px solid black",
              padding: "15px",
              margin: "15px",
              borderRadius: "10px",
            }}
        >
          <h2>{item.name}</h2>

            <p>{item.description}</p>

            <p>Category: {item.category}</p>

            <p>₹ {item.price}</p>

            <button>
              Add To Cart
            </button>

        </div>
      )))}
    </div>
  )
}

export default Menu;

