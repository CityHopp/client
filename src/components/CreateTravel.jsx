import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import axios from "axios"; 
import "./CreateTravel.css"; 
import { useAuth } from "../context/auth.context"; 

export default function CreateTravel() {
  const { user } = useAuth(); // Get user from context
  console.log(user);
  
  const [formData, setFormData] = useState({
    destination: "",
    startingCity: "",
    departingTime: "",
    breaks: "",
    petPolicy: false,
    kidPolicy: false,
    smokingPolicy: false,
    chitChatPolicy: false,
    stops: "",
    price: "",
    description: "",
    createdBy: "", // Add createdBy field to formData
  });

  // Update createdBy in formData if user is available
  useEffect(() => {
    if (user && user._id) { // Ensure user has _id
      setFormData((prevData) => ({
        ...prevData,
        createdBy: user._id, // Use _id from the user object
      }));
    }
  }, [user]); // Dependency on user

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure user ID is added to formData before submission
    if (!formData.createdBy) {
      return console.log("User not logged in or ID not available");
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/travels`, formData)
      .then((response) => {
        console.log("Travel created successfully", response);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    // Reset the form data after submission
    setFormData({
      destination: "",
      startingCity: "",
      departingTime: "",
      breaks: "",
      petPolicy: false,
      kidPolicy: false,
      smokingPolicy: false,
      chitChatPolicy: false,
      stops: "",
      price: "",
      description: "",
      createdBy: "", // Reset createdBy to avoid conflicts
    });
  };

  if (!user) {
    return <div>Loading...</div>; // or you can show a message to tell the user to log in
  }

  return (
    <div className="form-container">
      <h2>Plan Your Travel</h2>
      <p>Fill out the details below and offer a ride!</p>
      <form id="addForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination:</label>
          <input
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter the destination"
            required
          />
        </div>
        <div className="form-group">
          <label>Starting City:</label>
          <input
            name="startingCity"
            type="text"
            value={formData.startingCity}
            onChange={handleChange}
            placeholder="Enter the starting city"
            required
          />
        </div>
        <div className="form-group">
          <label>Departing Time:</label>
          <input
            name="departingTime"
            type="datetime-local"
            value={formData.departingTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Breaks:</label>
          <input
            name="breaks"
            type="number"
            value={formData.breaks}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label>Pet Friendly:</label>
          <input
            name="petPolicy"
            type="checkbox"
            checked={formData.petPolicy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group checkbox-group">
          <label>Kid Friendly:</label>
          <input
            name="kidPolicy"
            type="checkbox"
            checked={formData.kidPolicy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group checkbox-group">
          <label>Smoking Allowed:</label>
          <input
            name="smokingPolicy"
            type="checkbox"
            checked={formData.smokingPolicy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group checkbox-group">
          <label>Chit-Chat Allowed:</label>
          <input
            name="chitChatPolicy"
            type="checkbox"
            checked={formData.chitChatPolicy}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Stops (Comma separated):</label>
          <input
            name="stops"
            type="text"
            value={formData.stops}
            onChange={handleChange}
            placeholder="Enter stops (if any)"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter the price"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the trip"
          />
        </div>
        <Link to="/travelslist"/>
        <button type="submit">Create Travel</button>
        <Link />
      </form>
    </div>
  );
}
