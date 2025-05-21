import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Products.css"; // renamed to match your updated CSS

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/product/getAllProducts")
      .then((response) => {
        if (response.data.status) {
          setProducts(response.data.Products);
        } else {
          setError("Failed to fetch products.");
        }
      })
      .catch((err) => {
        setError("API error: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="products">
      <h3>Our Products</h3>
      <div className="product-list">
        {products.map((product) => {
          const imageUrl = `http://localhost:8000/uploads/product/${product.thumb_image}`;
          return (
            <Link
              to={`/product/${product._id || product.id}`}
              className="product-item"
              key={product._id || product.id}
            >
              <img
                src={imageUrl}
                alt={product.productName}
                className="product-image"
              />
              <h4>{product.productName}</h4>
              <p>{product.shortDescription}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
