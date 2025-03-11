import { useState } from "react";
import axios from "axios";
import "./CreateTravel.css"

export default function AddNewTravel() {

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
    const { value, name, type, checked } = event.target;

    setFormData((val) => ({
      ...val,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:5005/travels", 
        formData)
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
    <form id="addForm" onSubmit={handleSubmit}>
    <h2>Feel free to add your new travel plan by filling this form!</h2>
  
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
        type="number"
        value={formData.departingTime}
        onChange={handleChange}
        placeholder="Enter the time of departure"
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
  
    <div className="form-group checkbox-group">
      <label>Pet Policy:</label>
      <input
        name="petPolicy"
        type="checkbox"
        checked={formData.petPolicy}
        onChange={handleChange}
      />
    </div>
  
    <div className="form-group checkbox-group">
      <label>Kid Policy:</label>
      <input
        name="kidPolicy"
        type="checkbox"
        checked={formData.kidPolicy}
        onChange={handleChange}
      />
    </div>
  
    <div className="form-group checkbox-group">
      <label>Smoking Policy:</label>
      <input
        name="smokingPolicy"
        type="checkbox"
        checked={formData.smokingPolicy}
        onChange={handleChange}
      />
    </div>
  
    <div className="form-group checkbox-group">
      <label>Chit-Chat Policy:</label>
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
        placeholder="Enter a description for the travel"
      />
    </div>
  
    <button>Create Travel</button>
  </form>
  
  );
}
