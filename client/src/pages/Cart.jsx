import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function Cart() {
 const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = useContext(CartContext);
const grandTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  return (
    <div style={{ padding: "30px" }}>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        cart.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width="150"
              style={{ borderRadius: "10px" }}
            />

           <h2>{product.name}</h2>

<p>{product.description}</p>

<h3>₹ {product.price}</h3>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  }}
>
  <button
    onClick={() => decreaseQuantity(product._id)}
  >
    -
  </button>

  <span>{product.quantity}</span>

  <button
    onClick={() => increaseQuantity(product._id)}
  >
    +
  </button>
</div>

<h3>
  Total: ₹ {product.price * product.quantity}
</h3>
<button
  onClick={() => removeFromCart(product._id)}
  style={{
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Remove
</button>
          </div>
        ))
      )}
    {cart.length > 0 && (
  <div
    style={{
      marginTop: "30px",
      padding: "20px",
      borderTop: "2px solid gray",
    }}
  >
    <h2>Grand Total: ₹ {grandTotal}</h2>

    <Link to="/checkout">
  <button
    style={{
      marginTop: "15px",
      padding: "12px 25px",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Proceed to Checkout
  </button>
</Link>
  </div>
)}  
    </div>
  );
}

export default Cart;