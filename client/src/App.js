// import { useState, useEffect } from 'react'
import Destination from './Destination';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <NavBar />
      <h1>Destination Tracker</h1>
      <h2>Login/Signup</h2>
      <br></br>
      <h1>List of destinations</h1>
      <Destination />
    </div>
  )
}

export default App;
