// import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import Reviews from './Reviews';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/home">
        <Profile />
      </Route>
      <Route path="/destinations">
        <Destinations />
      </Route>
      <Route path="/reviews">
        <Reviews />
      </Route>
    </div>
  )
}

export default App;
