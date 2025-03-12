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
  const [requests, setRequests] = useState([]); // New state to hold requests
  const [error, setError] = useState(""); 

  // Fetch travels and requests
  useEffect(() => {
    if (user) {
      // Fetch user's travels
      axios
        .get(`${import.meta.env.VITE_API_URL}/travels`)
        .then((response) => {
          setTravelArr(response.data);
          const userTravels = response.data.filter((trip) => trip.createdBy === user._id);
          setFilteredTravels(userTravels);
        })
        .catch((error) => {
          console.error("Error fetching travel data:", error);
          setError("There was an error fetching the travel data. Please try again later.");
        });

      // Fetch requests for the user's travels
      axios
        .get(`${import.meta.env.VITE_API_URL}/requests/user/${user._id}`)
        .then((response) => {
          setRequests(response.data); // Set the fetched requests
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setError("There was an error fetching the requests. Please try again later.");
        });
    }
  }, [user]); 

  // Filter travels based on search
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = travelArr.filter(
        (trip) =>
          trip.startingCity.toLowerCase().includes(searchFrom.toLowerCase()) &&
          trip.destination.toLowerCase().includes(searchTo.toLowerCase()) &&
          (searchDate === "" || trip.departingTime === searchDate)
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

      <h3>Your Travel Requests</h3>
      <div className="requests-container">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="request-item">
              <p><strong>Requester:</strong> {request.from.name}</p>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <button
                onClick={() => handleRequestAction(request._id, "accepted")}
              >
                Accept
              </button>
              <button
                onClick={() => handleRequestAction(request._id, "rejected")}
              >
                Reject
              </button>
            </div>
          ))
        ) : (
          <p>No requests yet.</p>
        )}
      </div>

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
                <strong>Date:</strong> {element.departingTime}
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
            <li>
              <strong>User ID:</strong> {user._id}
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

  function handleRequestAction(requestId, status) {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/requests/${requestId}`, { status })
      .then((response) => {
        console.log("Request updated:", response);
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status } : req
          )
        );
      })
      .catch((error) => {
        console.error("Error updating request:", error);
      });
  }
}
