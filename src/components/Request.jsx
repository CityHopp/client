import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Request() {
  const [message, setMessage] = useState("");

  const { travelsId } = useParams();

  console.log("Travel ID:", travelsId);

  const [formData, setFormData] = useState({
    for: travelsId,
    message: "Hey wanna city hop together",
  });

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
    const storedToken = localStorage.getItem('authToken');
    console.log(newRequest);

    axios
      .post(
        "http://localhost:5005/request", 
        newRequest,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log("Request submitted successfully", response);
        setMessage("Request submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting request", error);
      });

    setFormData({
      message: "Hey wanna city hop together",
      status: "pending",
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
