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
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/destinations">
        <Destinations />
      </Route>
      <Route exact path="/reviews">
        <Reviews />
      </Route>
    </div>
  )
}

export default App;
