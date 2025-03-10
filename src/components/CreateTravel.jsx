import { useState } from "react";
import axios from "axios";
import "./CreateTravel.css"

export default function AddNewTravel({ setNewTravel }) {

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
    const newTravel = { ...formData };

    setNewTravel((prevTravels) => [newTravel, ...prevTravels]); 

    axios
      .post(
        "http://localhost:5005/travels", 
        newTravel)
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

      <label>
        Destination:
        <input
          name="destination"
          type="text"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Enter the destination"
          required
        />
      </label>

      <label>
        Starting City:
        <input
          name="startingCity"
          type="text"
          value={formData.startingCity}
          onChange={handleChange}
          placeholder="Enter the starting city"
          required
        />
      </label>

      <label>
        Departing Time:
        <input
          name="departingTime"
          type="number"
          value={formData.departingTime}
          onChange={handleChange}
          placeholder="Enter the time of departure"
          required
        />
      </label>

      <label>
      Number of Breaks:
        <input
          name="breaks"
          type="number"
          value={formData.breaks}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Date :
        <input
          name="date"
          type="Date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Enter the number of breaks"
          required
        />
      </label>

      <label>
        Pet Policy:
        <input
          name="petPolicy"
          type="checkbox"
          checked={formData.petPolicy}
          onChange={handleChange}
        />
      </label>

      <label>
        Kid Policy:
        <input
          name="kidPolicy"
          type="checkbox"
          checked={formData.kidPolicy}
          onChange={handleChange}
        />
      </label>

      <label>
        Smoking Policy:
        <input
          name="smokingPolicy"
          type="checkbox"
          checked={formData.smokingPolicy}
          onChange={handleChange}
        />
      </label>

      <label>
        Chit-Chat Policy:
        <input
          name="chitChatPolicy"
          type="checkbox"
          checked={formData.chitChatPolicy}
          onChange={handleChange}
        />
      </label>

      <label>
        Stops (Comma separated):
        <input
          name="stops"
          type="text"
          value={formData.stops}
          onChange={handleChange}
          placeholder="Enter stops (if any)"
        />
      </label>

      <label>
        Price:
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter the price"
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description for the travel"
        />
      </label>

      <button>Create Travel</button>
    </form>
  );
}
