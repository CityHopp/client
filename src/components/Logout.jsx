import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("authToken");
  if (!isLoggedIn) {
    return null; 
  }

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "80px"
  },
};

export default Logout;
