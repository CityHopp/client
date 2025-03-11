import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css"; // Importing CSS file

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5005/auth/login", data);
      console.log("Signin successful:", response.data);

      localStorage.setItem("authToken", response.data.authToken);
      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error signing in", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="📧 Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="🔒 Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
