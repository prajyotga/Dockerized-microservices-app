import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit=async (e)=>{
e.preventDefault();

try{

   

    const {data}= await API.post(
      "/auth/login", formData,
    )
    console.log(data);

    localStorage.setItem("token",data.token);

    alert("Login successfull");
    navigate("/restaurants");


}catch (error) {
      console.log(error);
 
      alert("Login Failed");
    }
  }


  const handleChange=(e)=>{

    setFormData({
       ...formData,
        [e.target.name]:e.target.value
    })
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={formData.email}
        />

        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={formData.password}
        />

        <br /><br />

        <button type="submit">Login</button>

        <br /><br />
        <Link to="/register">
        Register Here
      </Link>
      </form>
    </div>
  );
};

export default Login;
