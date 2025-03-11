import React from "react";
import { useState} from "react";
import"./Navbar.css";
import Lougout from "./Logout";

function Navbar(){

 return <>
    <header className="header">
      <a className="logo" href="/">CityHopper</a>
      <nav className ="navbar">
    <a href="/travels">Create Travel</a>
    <a href="/">About us</a>

    <Lougout/>
        </nav>
    </header>
 
    </>
}

export default Navbar;