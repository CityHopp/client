import React from "react";
import { useNavigate } from "react-router-dom";

const Lougout =()=>{
    const navigate = useNavigate();

    const handleLogout = () => {
      // Remove token from localStorage
      localStorage.removeItem("authToken");
  
     
      navigate("/");
    };
  
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

export default Lougout;