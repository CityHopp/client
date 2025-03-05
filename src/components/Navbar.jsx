import React from "react";
import { useState} from "react";
import"./Navbar.css";

function Navbar(){

    return <>
    <div className="navbar">
    <span>CityHopper</span>
    <span>About us</span>
    <span>Contact us</span>

    </div>
    <div className="searchbar">
        <form role = "search" >
        </form>
    </div>
    
    </>
}

export default Navbar;