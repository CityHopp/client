import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import CreateTravel from "./CreateTravel"

export default function ListOfTravels() {
  const [travelArr, setTravelArr] = useState([]);
  const [error, setError] = useState(null); 
  useEffect(() => {
    axios
      .get("http://localhost:5005/travels")
      .then((response) => {
        setTravelArr(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching travel data:", error);
        setError(
          "There was an error fetching the travel data. Please try again later."
        );
      });
  }, []);

  return (
    <div>
              <CreateTravel setNewTravel={setTravelArr} />
      {error && <div className="error">{error}</div>}
      {travelArr.map((element) => (
        <div key={element._id}>
          <ul>
            <li>
              <strong>Destination: </strong> {element.destination}
            </li>
            <li>
              <strong>Starting Point: </strong> {element.startingCity}
            </li>
            <li>
              <strong>Date: </strong> {element.date}
            </li>
            <li>
              <strong>Price: </strong> {element.price}
            </li>
          </ul>

          <Link to={`/travels/${element._id}`}>
            <button>Show Travel Detail</button>
          </Link>
          <Link to={`/request/${element._id}`}>
            <button>Request a seat</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
