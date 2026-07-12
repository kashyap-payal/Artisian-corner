import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://artisian-corner-production.up.railway.app/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Total:</strong> ₹ {order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h4>Products:</h4>

           {order.products.map((item, index) => (
  <div key={item.product?._id || index}>
    {item.product ? (
      <p>
        {item.product.name} × {item.quantity}
      </p>
    ) : (
      <p>
        Product not available × {item.quantity}
      </p>
    )}
  </div>
))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;