import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../context/auth.context";
import "./Navbar.css";
import Lougout from "./Logout";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <header className="header">
        <a className="logo" href="/">
          CityHopper
        </a>
        <nav className="navbar">
          <a href="/travels">Create Travel</a>
          <a href="/aboutus">About us</a>
          {isLoggedIn && (
            <>
              <Link to="/travelslist">
                <button>Projects</button>
              </Link>
              <button>Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                {" "}
                <button>Sign Up</button>{" "}
              </Link>
              <Link to="/login">
                {" "}
                <button>Login</button>{" "}
              </Link>
            </>
          )}

          <Lougout />
        </nav>
      </header>
    </>
  );
}

export default Navbar;
