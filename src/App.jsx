import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListOfTravels from './components/ListOfTravels';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TravelDetail from './pages/TravelDetails';
import Request from "./components/Request"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/travels" element={<ListOfTravels />} />
        <Route path="/travels/:travelsId" element={<TravelDetail />} />
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;