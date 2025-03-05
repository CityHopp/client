import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import ListOfTravels from './components/ListOfTravels'

function App() {
  

  return (
    <>
    <Navbar/>
    <HomePage/>
    <ListOfTravels />
    </>
  )
}

export default App
