import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import axios from "axios";

export default function Profile() {
  const { user, isLoading } = useAuth(); 

  const [travelArr, setTravelArr] = useState([]); 
  const [requests, setRequests] = useState([]); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/travels`)
        .then((response) => {
          setTravelArr(response.data);
          const userTravels = response.data.filter((trip) => trip.createdBy === user._id);
          

          const userTravelIds = userTravels.map(travel => travel._id);
          axios
            .get(`${import.meta.env.VITE_API_URL}/requests/`) 
            .then((response) => {
              const userRequests = response.data.filter((request) =>
                userTravelIds.includes(request.for._id) 
              );
              setRequests(userRequests); 
            })
            .catch((error) => {
              console.error("Error fetching requests:", error);
              setError("There was an error fetching the requests. Please try again later.");
            });
        })
        .catch((error) => {
          console.error("Error fetching travel data:", error);
          setError("There was an error fetching the travel data. Please try again later.");
        });
    }
  }, [user]); // Re-fetch whenever the user changes

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
            <button onClick={() => window.history.back()}>Back</button>
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
