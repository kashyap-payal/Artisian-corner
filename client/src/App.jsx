import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/Addproduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/SellerDashboard";
import EditProduct from "./pages/EditProduct";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route
  path="/seller-dashboard"
  element={<SellerDashboard />}
/>
<Route path="/edit-product/:id" element={<EditProduct />} />
<Route path="/wishlist" element={<Wishlist />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;