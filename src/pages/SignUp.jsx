import React, { useState } from "react";
import axios from "axios";
import "../pages/SignUp.css";

const Signup = () => {
  const [data, setData] = useState({
    name:"",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:5005/auth/signup", data)
      .then((response) => {
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error("Error signing up", error);
      });
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Your Name:</label>
          <input type="text" name="name" placeholder="👤 Enter your first name" value={data.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" placeholder="📧 Enter your email" value={data.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" placeholder="🔒 Create a password" value={data.password} onChange={handleChange} required />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
