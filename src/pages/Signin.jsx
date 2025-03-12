import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Signin.css"; 
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa"; // Import icons

const API_URL = "http://localhost:5005";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        navigate("/");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message ||
          "Invalid email or password. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1><FaSignInAlt /> Login</h1> {/* Sign-in icon */}

        <form onSubmit={handleLoginSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <FaSignInAlt /> Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </div>
    </div>
  );
}

export default Signin;
