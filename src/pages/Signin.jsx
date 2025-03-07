import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      //homepage
      navigate("/");
    } catch (error) {
      console.error("Error signing in", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Signin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="📧 Enter your email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="🔒 Enter your password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
