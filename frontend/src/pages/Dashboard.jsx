import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import Cookies from "js-cookie";
import axios from "axios";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (e) => {
      const token = Cookies.get("accessToken");
      // if (!token) {
      //   console.log("No Access Token");
      //   navigate("/login");
      //   return;
      // }
      console.log(token);

      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/users/get-current-user",
          {},
          {
            withCredentials: true, // ✅ cookie is sent
          }
        );
        console.log("Profile:", res.data);
        setUser(res.data?.data || {});
      } catch (err) {
        console.error("Unauthorized or error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  console.log(user);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>MyApp</h2>
        <ul>
          <li>Overview</li>
          <li>Users</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          {user && <p>Hello, {user.username}</p>}
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3>Users</h3>
            <p>102</p>
          </div>
          <div className="card">
            <h3>Active Sessions</h3>
            <p>23</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$4,560</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
