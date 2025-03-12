import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

// First, define the AuthContext
const AuthContext = React.createContext();

// Then define the custom hook that consumes the context
const useAuth = () => {
  return useContext(AuthContext); 
};

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const storeToken = (token) => { 
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => {   
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        const user = response.data;      
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {       
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
    
  const removeToken = () => {                 
    localStorage.removeItem("authToken");
  }
 
  const logOutUser = () => {                 
    removeToken();
    authenticateUser();
  }  
  
  useEffect(() => {  
    authenticateUser();                                   
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser  
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext, useAuth };
