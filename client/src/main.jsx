import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";
import App from "./App";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import WishlistProvider from "./context/WishlistContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <WishlistProvider>
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
</WishlistProvider>
);