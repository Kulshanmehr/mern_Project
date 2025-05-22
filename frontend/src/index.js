import React from "react";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "../src/pages/Login.jsx";
import Signup from "../src/pages/Signup.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Services from "./pages/Dashboard/Services";
import Projects from "./pages/Dashboard/Products.jsx";
import Product from "./pages/Product.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<App />} />
        <Route path="/categoryList" element={<CategoryPage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="dashboard">
          <Route index element={<DashboardHome />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
