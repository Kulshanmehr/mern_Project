// src/pages/Cart.jsx
import React from "react";
import useCartStore from "../store/cartStore";
import "../styles/CartPage.css";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section className="cart">
      <h3>Your Cart ({totalItems} items)</h3>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item._id} className="cart-item">
            <img
              src={`http://localhost:8000/uploads/product/${item.thumb_image}`}
              alt={item.productName}
              className="cart-thumb"
            />
            <div className="cart-info">
              <h4>{item.productName}</h4>
              <p>Qty:</p>
              <div className="qty-controls">
                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item._id)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} className="clear-btn">
        Clear Cart
      </button>
    </section>
  );
}
