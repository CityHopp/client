import React, { useContext } from "react";
import {  AuthContext } from "../context/auth.context";
import axios from "axios";

const Logout = () => {
  const { isLoggedIn, logOutUser} = useContext(AuthContext); 
  


  if (!isLoggedIn) {
    return null; 
  }

  return (
    <button onClick={logOutUser} style={styles.button}>
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
