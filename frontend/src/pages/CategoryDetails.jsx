import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/categoryDetails.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getdata = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8000/api/v1/category/getCategoryProducts/${id}`;
      const { data } = await axios.get(url);
      const { category = {}, products = [] } = data;
      setCategory(category);
      setProducts(products);
      setLoading(false);
      console.log(data, "apooidajs");
    } catch (error) {
      setLoading(false);
      setError(error.response.message);
      console.log(error, "aspodkasod");
    }
  };
  useEffect(() => {
    getdata();
  }, [id]);
  if (loading) return <p>Loading category details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <Header />
      <Banner />

      <div className="category-detail">
        <h2>{category.categoryName}</h2>
        <img
          src={`http://localhost:8000/uploads/category/${category.category_thumb_image}`}
          alt={category.categoryName}
        />
        <p>{category.description}</p>

        <div className="products-section">
          <h3 className="products-title">Products in this Category</h3>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="product-card" key={product._id}>
                  <img
                    src={`http://localhost:8000/uploads/products/${product.productImage}`}
                    alt={product.productName}
                  />
                  <div className="product-info">
                    <h4>{product.productName}</h4>
                    <p>${product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetail;
