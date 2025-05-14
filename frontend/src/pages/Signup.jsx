import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Form.css";
import axios from "axios";

export default function Signup() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("username", formData.username);
    data.append("fullname", formData.fullname);
    data.append("avatar", formData.avatar);
    data.append("coverImages", formData.coverImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );
      setErrorMessage("");
      setSuccessMessage(response.data?.message || "Signup successful!");
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });

      console.log("Signup success:", response.data);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );

      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} encType="multipart/form-data">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Avatar:</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Signup</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
