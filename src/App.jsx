import { Routes, Route } from "react-router-dom";
import {useContext} from "react";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListOfTravels from './components/ListOfTravels';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TravelDetail from './pages/TravelDetails';
import CreateTravel from './components/CreateTravel';
import Profile from "./pages/profile";

import { Component } from "react";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travelslist" element={<ListOfTravels />} />
        <Route path="/travels/:travelsId" element={<TravelDetail />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/travels" element={<CreateTravel/>}/>
      </Routes>
    </>
  );
}
export default App;