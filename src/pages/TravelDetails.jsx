import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TravelDetail(props) {
  const { travelsId } = useParams();
  const navigate = useNavigate();

  // Fetching the travel details based on the travelId from the URL parameter
  const [travel, setTravel] = useState(null);

  useEffect(() => {
    // Fetch the specific travel data from the API using the travelId
    axios
      .get(`http://localhost:5005/travels/${travelsId}`)
      .then((response) => {
        setTravel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching travel data:", error);
        navigate("/"); // Navigate back to home if travel not found
      });
  }, [travelsId, navigate]);

  if (!travel) {
    return <div>Loading...</div>;
  }

  return (
    <div key={travel._id} className="home">
      <div className="travel" style={{ width: "60%" }}>
        <ul className="flexul">
          <li><strong>Destination:</strong> {travel.destination}</li>
          <li><strong>Starting Point:</strong> {travel.startingCity}</li>
          <li><strong>Date:</strong> {travel.date}</li>
          <li><strong>Price:</strong> {travel.price}</li>
          <li><strong>Description:</strong> {travel.description}</li>
          <br />
          <Link to="/">
            <button>Back</button>
          </Link>
          {/* Edit Button
          <Link to={`/edit/${travel._id}`}>
            <button>Edit</button>
          </Link> */}
        </ul>
      </div>
    </div>
  );
}
