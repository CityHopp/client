import React from "react";
import "./aboutus.css"; 

 function AboutUs() {
  return (
    <section className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our travel community! Our mission is to make travel{" "}
          <strong>more affordable, eco-friendly, and enjoyable</strong> by
          connecting drivers and passengers for shared rides.
        </p>
      </div>

      <div className="about-cards">
        <div className="card">
          <h3>🌍 Our Mission</h3>
          <p>
            We aim to reduce travel costs and carbon footprints by promoting
            ride-sharing.
          </p>
        </div>

        <div className="card">
          <h3>🤝 Community Driven</h3>
          <p>
            A trusted space where drivers and passengers can connect and share
            safe journeys.
          </p>
        </div>

        <div className="card">
          <h3>🚗 Affordable Rides</h3>
          <p>
            Share your trip and split the cost, making travel budget-friendly
            for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
