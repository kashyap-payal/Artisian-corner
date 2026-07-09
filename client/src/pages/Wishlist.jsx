import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } =
    useContext(WishlistContext);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2>Your Wishlist is Empty</h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
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
                  to={`/product/${product._id}`}
                  className="flex-1"
                >
                  <button className="w-full bg-blue-600 text-white py-2 rounded">
                    View
                  </button>
                </Link>

                <button
                  onClick={() =>
                    removeFromWishlist(product._id)
                  }
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;