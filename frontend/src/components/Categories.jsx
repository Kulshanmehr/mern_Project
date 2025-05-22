import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/category/getAllCategories") // use correct endpoint
      .then((response) => {
        if (response.data.status) {
          setCategory(response.data.categories); // assuming backend returns `categories`
        } else {
          setError("Failed to fetch categories.");
        }
      })
      .catch((err) => {
        setError("API error: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="category-section">
      <div className="category-container">
        <h2 className="category-title">Browse Categories</h2>
        <div className="category-grid">
          {category.map((cat) => (
            <div className="category-item" key={cat._id}>
              <img
                src={`http://localhost:8000/uploads/category/${cat.category_thumb_image}`}
                alt={cat.categoryName}
              />
              <h3>{cat.categoryName}</h3>
              <p>{cat.shortDescription}</p>
              <button className="explore-button">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
