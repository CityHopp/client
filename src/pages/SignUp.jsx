import React, { useState } from "react";
import axios from "axios";
import "../pages/Signup.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios
      .post("https://localhost:5005/signup", data)
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
          <label>First Name:</label>
          <input type="text" name="firstName" placeholder="👤 Enter your first name" value={data.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" placeholder="👤 Enter your last name" value={data.lastName} onChange={handleChange} required />

          <label>Mobile Number:</label>
          <input type="tel" name="mobileNumber" placeholder="📱 Enter your mobile number" value={data.mobileNumber} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" placeholder="📧 Enter your email" value={data.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" placeholder="🔒 Create a password" value={data.password} onChange={handleChange} required />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="🔒 Confirm password" value={data.confirmPassword} onChange={handleChange} required />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
