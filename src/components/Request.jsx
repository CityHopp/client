import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Request() {
  const { travelsId } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    for: travelsId,  
    message: "Hey wanna city hop together",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((val) => ({
      ...val,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRequest = { ...formData };
    const storedToken = localStorage.getItem("authToken"); 

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/request`,  
        newRequest,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setMessage("Request submitted successfully");

        navigate(`/travelslist/${travelsId}`);
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        setMessage("Error submitting the request, please try again.");
      });

    setFormData({
      message: "Hey wanna city hop together",
      for: travelsId,
    });
  };

  return (
    <>
      {message && (
        <div className="banner banner-success">
          <h1>{message}</h1>
        </div>
      )}

      <form id="addRequestForm" onSubmit={handleSubmit}>
        <h2>Feel free to submit your request to travel together!</h2>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter a message"
          />
        </label>

        <button type="submit">Create Request</button>
      </form>
    </>
  );
}
