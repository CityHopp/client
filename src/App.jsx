import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListOfTravels from './components/ListOfTravels';
import Signin from './pages/Signin';
import Signup from './pages/SignUp';
import TravelDetail from './pages/TravelDetails';
import CreateTravel from './components/CreateTravel';
import Profile from './pages/Profile';
import Request from './components/Request'; // Import the Request component
import { Component } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travelslist" element={<ListOfTravels />} />
        <Route path="/travelslist/:travelsId" element={<TravelDetail />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/travels" element={<CreateTravel />} />
        
        {/* Define the route for creating a request, passing the travelsId */}
        <Route path="/request/:travelsId" element={<Request />} /> 
      </Routes>
    </>
  );
}

export default App;
