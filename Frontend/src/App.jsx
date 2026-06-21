import {Routes,BrowserRouter,Route} from 'react-router-dom'
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Menu from "./pages/Menu"
import Orders from "./pages/Orders"
import Register from "./pages/Register"
import Restaurants from "./pages/Restaurants"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>

       <Route path="/cart" element={<Cart/>}/>

       <Route path="/menu/:restaurantId" element={<Menu/>}/>

        <Route path="/orders" element={<Orders/>}/>

        <Route path="/register" element={<Register/>}/>

        <Route path="/restaurants" element={<Restaurants/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App