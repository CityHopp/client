import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import axios from "axios";

export default function Profile() {
  const { user, isLoading } = useAuth(); 
  const [request, setRequest] = useState([]); 
  const [error, setError] = useState(""); 
  const [isUpdating, setIsUpdating] = useState(false); 

  useEffect(() => {
    if (user && !isLoading) { 
      axios
        .get(`${import.meta.env.VITE_API_URL}/request`)
        .then((response) => {
          const userRequest = response.data.filter(
            (request) => request.for._id === user._id
            

          );
          setRequest(userRequest);
        })
        .catch((error) => {
          console.error("Error fetching request:", error);
          setError("There was an error fetching the request. Please try again later.");
        });
    }
  }, [user, isLoading]); 

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

      <h3>Your Travel Request</h3>
      <div className="request-container">
        {request.length > 0 ? (
          request.map((request) => (
            <div key={request._id} className="request-item">
              <p><strong>Requester:</strong> {request.from?.name || "Unknown"}</p>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <button
                onClick={() => handleRequestAction(request._id, "accepted")}
                disabled={isUpdating}
              >
                {isUpdating ? "Processing..." : "Accept"}
              </button>
              <button
                onClick={() => handleRequestAction(request._id, "rejected")}
                disabled={isUpdating}
              >
                {isUpdating ? "Processing..." : "Reject"}
              </button>
            </div>
          ))
        ) : (
          <p>No request yet.</p>
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
    setIsUpdating(true);
  

    const storedToken = localStorage.getItem("authToken"); 
  
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/request/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`, 
          },
        }
      )
      .then((response) => {
        console.log("Request updated:", response);
        setRequest((prevRequest) =>
          prevRequest.map((req) =>
            req._id === requestId ? { ...req, status } : req
          )
        );
      })
      .catch((error) => {
        console.error("Error updating request:", error);
        setError("There was an error updating the request. Please try again later.");
      })
      .finally(() => setIsUpdating(false));
  }
}