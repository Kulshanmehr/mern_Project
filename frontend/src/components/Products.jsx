// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/product/getAllProducts"
        );
        if (response.data.status) {
          setProducts(response.data.Products);
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        setError("API error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="products">
      <h3>Our Products</h3>
      <div className="product-list">
        {products.map((product) => {
          const imageUrl = `http://localhost:8000/uploads/product/${product.thumb_image}`;
          const cartItem = cart.find((item) => item._id === product._id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div className="product-item" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="product-image"
                />
                <h4>{product.productName}</h4>
                <p>{product.shortDescription}</p>
              </Link>

              {quantity === 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="cart-qty-controls">
                  <button onClick={() => decreaseQuantity(product._id)}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(product._id)}>
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
