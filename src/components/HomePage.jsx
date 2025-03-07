import React from "react";
import { useState} from "react";
import "./HomePage.css";
import ListOfTravels from './ListOfTravels';


function HomePage(){
const [search, setSearch] = useState("");
const [searchto, setSearchto] = useState("");
const [date, setDate] = useState("");
const [travelArr, setTravelArr] = useState([]);

    return(
     <div className="container">
     <div className="cover"> </div>
   < div className="searchbar">
                <form role="search-from-where">
                    <input 
                        type="text"
                        placeholder="Search your trip..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <form role="search-to-where">
                    <input 
                        type="text"
                        placeholder="what's your target..."
                        value={searchto}
                        onChange={(e) => setSearchto(e.target.value)}
                    />
                </form>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <ListOfTravels/>
            </div> 
       </div>
    
    )
}

export default HomePage