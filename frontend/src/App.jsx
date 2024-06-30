import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter , Routes ,Route } from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import Footer from "./Components/Footer/Footer"
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import AdminRedirect from "./Components/AdminRedirect/AdminRedirect"
import Success from "./Pages/Success"
import Cancel from "./Pages/Cancel"


function App() {
  return (
    <div>  
      
      <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path="/" element={<Shop />}/>
        <Route path="/men" element = {<ShopCategory banner={men_banner} category = "Men" />} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category = "Women" />}/>
        <Route path="/kids" element={<ShopCategory banner={kids_banner} category = "Kids"/>}/>
        <Route path="/cart" element = {<Cart />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/success" element= {<Success /> } />
        <Route path="/cancel" element= {<Cancel /> } />
        <Route path="/profile" element = {<Profile />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/product/:productId" element = {<Product />}>
        </Route>
      </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
