import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
function Checkout() {
    const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
const [address, setAddress] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
});

const [paymentMethod, setPaymentMethod] = useState("COD");
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

const handlePlaceOrder = async () => {
  if (
  !address.fullName ||
  !address.phone ||
  !address.address ||
  !address.city ||
  !address.state ||
  !address.pincode
) {
  toast.error("Please fill all shipping details");
  return;
}
  try {
    const token = localStorage.getItem("token");

    const products = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const response = await axios.post(
      "http://localhost:5000/api/orders",
      {
        
  products,
  totalAmount: grandTotal,
  shippingAddress: address,
  paymentMethod,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

 toast.success(response.data.message);

    // Clear the cart
    clearCart();

    // Redirect to Home
    navigate("/");
  } catch (error) {
    console.log(error.response?.data || error.message);
   toast.error("Failed to place order");
  }
};
  return (
    <div style={{ padding: "30px" }}>
      <h1>Checkout</h1>
<h2 className="text-2xl font-bold mb-4">
  Shipping Address
</h2>

<input
  type="text"
  placeholder="Full Name"
  value={address.fullName}
  onChange={(e) =>
    setAddress({ ...address, fullName: e.target.value })
  }
  className="border p-2 rounded w-full mb-3"
/>

<input
  type="text"
  placeholder="Phone Number"
  value={address.phone}
  onChange={(e) =>
    setAddress({ ...address, phone: e.target.value })
  }
  className="border p-2 rounded w-full mb-3"
/>

<input
  type="text"
  placeholder="Address"
  value={address.address}
  onChange={(e) =>
    setAddress({ ...address, address: e.target.value })
  }
  className="border p-2 rounded w-full mb-3"
/>

<input
  type="text"
  placeholder="City"
  value={address.city}
  onChange={(e) =>
    setAddress({ ...address, city: e.target.value })
  }
  className="border p-2 rounded w-full mb-3"
/>

<input
  type="text"
  placeholder="State"
  value={address.state}
  onChange={(e) =>
    setAddress({ ...address, state: e.target.value })
  }
  className="border p-2 rounded w-full mb-3"
/>

<input
  type="text"
  placeholder="Pincode"
  value={address.pincode}
  onChange={(e) =>
    setAddress({ ...address, pincode: e.target.value })
  }
  className="border p-2 rounded w-full mb-6"
/>
      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            borderBottom: "1px solid gray",
            marginBottom: "15px",
            paddingBottom: "15px",
          }}
        >
          <h3>{item.name}</h3>

          <p>Quantity: {item.quantity}</p>

          <p>Price: ₹{item.price}</p>

          <h4>Total: ₹{item.price * item.quantity}</h4>
        </div>
      ))}

      <h2>Grand Total: ₹{grandTotal}</h2>

     
 <h2 className="text-2xl font-bold mt-6">
  Payment Method
</h2>

<label className="block mt-3">
  <input
    type="radio"
    value="COD"
    checked={paymentMethod === "COD"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  {" "}Cash on Delivery
</label>

<label className="block mt-2">
  <input
    type="radio"
    value="ONLINE"
    checked={paymentMethod === "ONLINE"}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  {" "}Online Payment (Coming Soon)
</label>
<button
  onClick={handlePlaceOrder}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Place Order
</button>

    </div>
  );
}

export default Checkout;