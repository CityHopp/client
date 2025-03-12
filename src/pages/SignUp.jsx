import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUserPlus, FaUser } from "react-icons/fa";
import "./Signup.css"; 



function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = { email, password, name };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        const errorDescription = error.response?.data?.message || "Signup failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2><FaUserPlus /> Sign Up</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label><FaUser /> Name:</label>
            <input 
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={handleName}
              required
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email:</label>
            <input 
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div className="form-group">
            <label><FaLock /> Password:</label>
            <input 
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
