import React from "react";
import { useState } from "react";
import axios from "axios";
import "../pages/Signin.css";

const Signin = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("https://localhost:5005/signin", formData)
    .then((response) => {
      console.log("Signin successful:", response.data);
    })
    .catch((error) => {
      console.error("Error signing in", error);
    });

  };

  return (
   
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" placeholder="👤 Enter your name" value={data.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" placeholder="📧 Enter your email " value={data.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" placeholder="🔒 Password" value={data.password} onChange={handleChange} required />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Signin;
