import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/ListOfTravels.css";

export default function ListOfTravels() {
  const [travelArr, setTravelArr] = useState([]);
  const [filteredTravels, setFilteredTravels] = useState([]); 
  const [error, setError] = useState(null);

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/travels`)
      .then((response) => {
        setTravelArr(response.data);
        setFilteredTravels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching travel data:", error);
        setError(
          "There was an error fetching the travel data. Please try again later."
        );
      });
  }, []);

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

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search starting city..."
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search destination..."
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

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
    </div>
  );
}