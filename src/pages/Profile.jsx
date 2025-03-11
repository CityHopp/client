// Frontend Profile Component
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
//   const { userId } = useParams();  // Get userId from URL
  const navigate = useNavigate();

  const [travel, setTravel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/user`)  
      .then((response) => {
        setTravel(response.data);  
      })
      .catch((error) => {
        console.error("Error fetching travel data:", error);
        navigate("/"); 
      });
  }, [userId, navigate]);

  if (!travel) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="home">
      <div className="travel" style={{ width: "60%" }}>
        <ul className="flexul">
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>E-Mail:</strong> {user.email}</li>
          <br />
          <Link to="/">
            <button>Back</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}
