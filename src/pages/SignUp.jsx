import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../pages/SignUp.css"; 

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); 

    axios
      .post("http://localhost:5005/auth/signup", data)
      .then((response) => {
        console.log("Signup successful:", response.data);
        setLoading(false); 
        navigate("/login"); // Redirect to login page after successful signup
      })
      .catch((error) => {
        setLoading(false); 
        console.error("Error signing up", error);
        setError("Signup failed. Please try again."); 
      });
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              name="name"
              placeholder="👤 Enter your first name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="🔒 Create a password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
