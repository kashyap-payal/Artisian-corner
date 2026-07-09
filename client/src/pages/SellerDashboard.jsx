import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SellerDashboard() {
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      const myProducts = res.data.filter(
        (product) => product.seller?._id === user.id
      );

      setProducts(myProducts);
    } catch (err) {
      console.log(err);
    }
  };
const deleteProduct = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();

    alert("Product deleted successfully!");
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Failed to delete product");
  }
};
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Products
      </h1>

      {products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg"
              />

              <h2 className="text-xl font-bold mt-4">
                {product.name}
              </h2>

              <h3 className="text-green-600 text-2xl">
                ₹ {product.price}
              </h3>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/edit-product/${product._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>
<button
  onClick={() => deleteProduct(product._id)}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
  Delete
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;