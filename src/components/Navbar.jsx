import React from "react";
import { useState} from "react";
import"./Navbar.css";
import Lougout from "./Logout";

function Navbar(){

    return <>
    <div className="navbar">
    <span>CityHopper</span>
    <span>About us</span>
    <span>Contact us</span>
    <Lougout/>
    </div>
 
    </>
}

export default Navbar;