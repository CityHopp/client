import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // Navigate to the home page or login page after logout
    navigate("/");
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("authToken");

  // Only render the button if the user is logged in
  if (!isLoggedIn) {
    return null; // Don't render the button if not logged in
  }

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Logout;
