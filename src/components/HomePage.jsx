import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <img
          src="../src/assets/images/vecteezy_car-with-baggage-on-top-driving-desert-road_16263838.jpg"
          alt="Car on a road"
          className="hero-image"
        />
      </div>
      <section className="info-section">
        <h2>Your Pick of Rides at Low Prices</h2>
        <p>
          No matter where you’re going, by bus or carpool, find the perfect ride
          from our wide range of destinations and routes at low prices.
        </p>
      </section>

      <section className="info-section">
        <h2>Trust Who You Travel With</h2>
        <p>
          We take the time to get to know each of our members and bus partners.
          We check reviews, profiles and IDs, so you know who you’re travelling
          with and can book your ride at ease on our secure platform.
        </p>
      </section>

      <section className="info-section">
        <h2>Scroll, Click, Tap and Go!</h2>
        <p>
          Booking a ride has never been easier! Thanks to our simple app powered
          by great technology, you can book a ride close to you in just minutes.
        </p>
      </section>

      <section className="security">
      <h2>Help us keep you safe from scams</h2>
      <p>At CityHopper, we're working hard to make our platform as secure as it can be. 
       But when scams do happen, we want you to know exactly how to avoid and report them.
       Follow our tips to help us keep you safe.
       </p>
      </section>
      
    </div>
  );
}

export default HomePage;
