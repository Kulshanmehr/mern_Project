import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product/productDetail/${id}`)
      .then((response) => {
        if (response.data.status) {
          setProduct(response.data.product);
        } else {
          setError("Product not found.");
        }
      })
      .catch((err) => {
        setError("Error fetching product: " + err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return null;

  const imageUrl = `http://localhost:8000/uploads/product/${product.thumb_image}`;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.productName}</h2>
      <img
        src={imageUrl}
        alt={product.productName}
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
      <p>{product.shortDescription}</p>
      <p>
        <strong>Full Description:</strong> {product.fullDescription}
      </p>
    </div>
  );
}
