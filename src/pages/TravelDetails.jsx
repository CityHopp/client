import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TravelDetail() {
  const { travelsId } = useParams();
  const navigate = useNavigate();

  const [travel, setTravel] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/travels ${travelsId}`)
      .then((response) => {
        setTravel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching travel data:", error);
        navigate("/"); 
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
          <Link to={`/travels/request/${travel._id}`}>
            <button>Make a request</button>
          </Link> 
        </ul>
      </div>
    </div>
  );
}
