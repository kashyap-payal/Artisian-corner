import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/WishlistContext";
function Home() {
  const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const { addToCart } = useContext(CartContext);
const { addToWishlist } = useContext(WishlistContext);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://artisian-corner-production.up.railway.app/api/products"
      );

     console.log("Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://artisian-corner-production.up.railway.app/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts(); // Reload products

    toast.success("Product Deleted Successfully");
  } catch (error) {
  console.log(error.response);
  console.log(error.response?.data);
}
};
 return (
  <div className="max-w-7xl mx-auto p-8">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-10 text-center shadow-lg">
  <h1 className="text-5xl font-bold">
    Discover Unique Handmade Crafts
  </h1>

  <p className="mt-4 text-xl">
    Shop beautiful handmade products created by talented artisans.
  </p>

  <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
    Shop Now
  </button>
</div>
   <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
  Handmade Products
</h1>
<input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "25px",
    borderRadius: "8px",
    border: "1px solid gray",
    fontSize: "16px",
  }}
/>
<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
  }}
>
  <option value="All">All Categories</option>
  <option value="Home Decor">Home Decor</option>
  <option value="Kitchen">Kitchen</option>
  <option value="Fashion">Fashion</option>
  <option value="Art">Art</option>
</select>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) =>
    selectedCategory === "All"
      ? true
      : product.category === selectedCategory
  )
  .map((product) => (
        <div
  key={product._id}
  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-60 object-cover"
  />

  <div className="p-5">
    <h2 className="text-xl font-bold">
      {product.name}
    </h2>

    <p className="text-gray-600 mt-2">
      {product.description}
    </p>

    <h3 className="text-2xl font-bold text-green-600 mt-4">
      ₹ {product.price}
    </h3>

    <p className="text-gray-500 mt-2">
      {product.category}
    </p>

    <div className="flex gap-3 mt-5">
      <button
        onClick={() => addToCart(product)}
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
<button
  onClick={() => addToWishlist(product)}
  className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
>
  ❤️ Wishlist
</button>
     <Link
  to={`/product/${product._id}`}
  className="flex-1"
>
  <button
    className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
  >
    View Details
  </button>
</Link>
<button
  onClick={() => deleteProduct(product._id)}
  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
>
  Delete
</button>
    </div>
  </div>

        </div>
      ))}
    </div>
  </div>
);
}
export default Home;