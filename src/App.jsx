import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./Nonveg";
import Tiffin from "./Tiffin";
import Snacks from "./Snacks";
import Icecream from "./Icecream";
import Cart from "./Cart";
import Profile from "./Profile";
import BlogPost from "./BlogPost";
import Login from "./Login";
import Contact from "./Contact";
import Orders from "./Orders";   // ✅ FIXED (Capital O)
import Register from "./Register";
import Addition from "./Addition";
import "./App.css";


function App() {
  const cartItems = useSelector((state) => state.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <ToastContainer />

      <nav className="navbar">
        <Link to="/">
          <i className="fa-solid fa-house"></i> Home
        </Link>

        <Link to="/veg">
          <i className="fas fa-leaf"></i> Veg
        </Link>

        <Link to="/nonveg">
          <i className="fas fa-drumstick-bite"></i> NonVeg
        </Link>

        <Link to="/tiffin">
          <i className="fas fa-utensils"></i> Tiffin
        </Link>

        <Link to="/snacks">
          <i className="fas fa-cookie"></i> Snacks
        </Link>

        <Link to="/icecream">
          <i className="fas fa-ice-cream"></i> Icecream
        </Link>

        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i> Cart ({totalQuantity})
        </Link>

        <Link to="/login">
          <i className="fas fa-user"></i> Login
        </Link>

        <Link to="/contact">
          <i className="fas fa-envelope"></i> Contact
        </Link>

        <Link to="/orders">
          <i className="fas fa-list"></i> Orders
        </Link>
        <Link to="/register">
  <i className="fas fa-user-plus"></i> Register
</Link>
       <Link to="/addition">
  <i className="fas fa-plus"></i> Addition
</Link>


        
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/tiffin" element={<Tiffin />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/icecream" element={<Icecream />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />  {/* ✅ FIXED */}
        <Route path="/Register"element={<Register />} />
        <Route path="/Addition"element={<Addition />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;







