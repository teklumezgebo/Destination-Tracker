// import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import Reviews from './Reviews';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  function login() {
    fetch('')
    .then(res => {
      if (res.ok) {
        // set state
      } else {
        // invalid username/password
      }
    } 
    )
  }
  
  return (
    <div>
      <NavBar />
      <button>Login</button>
      <button>Sign Up</button>
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

export default App
