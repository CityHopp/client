import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context"; 
import axios from "axios";

export default function Profile() {
  const { user, isLoading } = useAuth(); 

  const [travelArr, setTravelArr] = useState([]); 
  const [filteredTravels, setFilteredTravels] = useState([]); 
  const [searchFrom, setSearchFrom] = useState(""); 
  const [searchTo, setSearchTo] = useState(""); 
  const [searchDate, setSearchDate] = useState(""); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}`)
      .then((response) => {
        setTravelArr(response.data);
        const userTravels = response.data.filter((trip) => trip.userId === user._id);
        setFilteredTravels(userTravels);
      })
      .catch((error) => {
        console.error("Error fetching travel data:", error);
        setError("There was an error fetching the travel data. Please try again later.");
      });
  }, [user]); 

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = travelArr.filter(
        (trip) =>
          trip.startingCity.toLowerCase().includes(searchFrom.toLowerCase()) &&
          trip.destination.toLowerCase().includes(searchTo.toLowerCase()) &&
          (searchDate === "" || trip.date === searchDate)
      );
      setFilteredTravels(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFrom, searchTo, searchDate, travelArr]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>User is not logged in</div>; 
  }

  return (
    <div>
      <div className="wrap"></div>

   

      {error && <div className="error">{error}</div>}

      {filteredTravels.length > 0 ? (
        filteredTravels.map((element) => (
          <div key={element._id}>
            <ul>
              <li>
                <strong>Destination:</strong> {element.destination}
              </li>
              <li>
                <strong>Starting Point:</strong> {element.startingCity}
              </li>
              <li>
                <strong>Date:</strong> {element.date}
              </li>
              <li>
                <strong>Price:</strong> {element.price}
              </li>
            </ul>

            <Link to={`/travels/${element._id}`}>
              <button>Travel Details</button>
            </Link>
            <Link to={`/request/${element._id}`}>
              <button>Request a seat</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No matching trips found.</p>
      )}
      <div className="home">
        <div className="travel" style={{ width: "60%" }}>
          <ul className="flexul">
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>E-Mail:</strong> {user.email}
            </li>
            <br />
            <Link to="/">
              <button>Back</button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
