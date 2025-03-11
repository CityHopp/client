import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListOfTravels from './components/ListOfTravels';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TravelDetail from './pages/TravelDetails';
import Request from './components/Request'
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
        <Route path="/travels/request/:travelsId" element={<Request />} />
      </Routes>
    </>
  );
}
export default App;