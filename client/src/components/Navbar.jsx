
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useContext(CartContext);
const { wishlist } = useContext(WishlistContext);
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold tracking-wide"
        >
          Artisan's Corner
        </Link>
{user?.role === "admin" && (
  <Link
    to="/admin-dashboard"
    className="hover:text-yellow-300"
  >
    Admin Dashboard
  </Link>
)}
        <div className="flex items-center gap-6 text-lg">

          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/my-orders" className="hover:text-yellow-300">
            My Orders
          </Link>
<Link
  to="/seller-dashboard"
  className="hover:text-yellow-300"
>
  Dashboard
</Link>
          <Link to="/add-product" className="hover:text-yellow-300">
            Add Product
          </Link>

          <Link to="/cart" className="relative hover:text-yellow-300">
  <FaShoppingCart size={24} />

  {cart.length > 0 && (
    <span
      className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {cart.length}
    </span>
  )}
</Link>
<Link
  to="/wishlist"
  className="relative hover:text-yellow-300"
>
  ❤️

  {wishlist.length > 0 && (
    <span
      className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
    >
      {wishlist.length}
    </span>
  )}
</Link>
      {user ? (
  <div className="flex items-center gap-2">
    <FaUserCircle size={24} />
    <span>{user.name}</span>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      }}
      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
) : (
  <div className="flex items-center gap-4">
    <Link
      to="/login"
      className="hover:text-yellow-300"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="hover:text-yellow-300"
    >
      Register
    </Link>
  </div>
)}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;