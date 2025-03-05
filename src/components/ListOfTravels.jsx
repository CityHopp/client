import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ListOfTravels() {
  const [travelArr, setTravelArr] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:5005/travels")
    fetch("/travels")
      .then((response) => response.json())
      .then((data) => setTravelArr(data)) 
      .catch((error) => console.error("Error fetching travel data:", error));
  }, []); 

  return (
    <div id="tasks">
      {travelArr.map((element) => (
        <div className="task" key={element._id}> 
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
            <button>
              Show Travel Detail
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
