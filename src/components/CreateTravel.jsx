import { useState } from "react";
import axios from "axios";
import "./CreateTravel.css";

export default function CreateTravel() {
  const [formData, setFormData] = useState({
    createdBy: "",
    destination: "",
    startingCity: "",
    departingTime: "",
    date: "",
    breaks: "",
    petPolicy: false,
    kidPolicy: false,
    smokingPolicy: false,
    chitChatPolicy: false,
    stops: "",
    price: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}`, formData)
      .then((response) => {
        console.log("Travel created successfully", response);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    setFormData({
      createdBy: "",
      destination: "",
      startingCity: "",
      departingTime: "",
      date: "",
      breaks: "",
      petPolicy: false,
      kidPolicy: false,
      smokingPolicy: false,
      chitChatPolicy: false,
      stops: "",
      price: "",
      description: "",
    });
  };

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
            type="time"
            value={formData.departingTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            name="date"
            type="date"
            value={formData.date}
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

        <button type="submit">Create Travel</button>
      </form>
    </div>
  );
}
