import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";
import userIcon from "/images/user.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="header">
      <a className="logo" href="/">
        CityHopper
      </a>
      <nav className="navbar">
        <Link to="/travels">Create Travel</Link>
        <Link to="/aboutus">About us</Link>

        {!isLoggedIn && (
          <button
            className="user-icon"
            onClick={() => setDropdown(!dropdown)}
            aria-label="Toggle user menu"
          >
            <img src={userIcon} alt="User" className="user-img" />
          </button>
        )}

        {dropdown && !isLoggedIn && (
          <div className="dropdown">
            <ul>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            </ul>
          </div>
        )}
        {isLoggedIn && (
          <Link to="/profile">
            <button className="profile-btn" >your profile</button>
          </Link>
        )}

        {isLoggedIn && (
          <button className="logout-btn" onClick={logOutUser}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
