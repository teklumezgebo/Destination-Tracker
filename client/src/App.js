import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import ReviewPage from './ReviewPage';
import UserReviews from './UserReviews';

function App() {

  const [user, setUser] = useState(null)
 
  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      } else {
        res.json().then(res => console.log(res))
      }
    })
  }, [])

  function currentUser(user) {
    setUser(user)
  }

  if (user === null) return (<Login onUserChange={currentUser}/>)

  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Route path="/profile">
        <Profile user={user}/>
      </Route>
      <Route exact path="/">
        <Destinations/>
      </Route>
      <Route exact path="/reviewpage">
        <ReviewPage user={user}/>
      </Route>
      <Route path="/reviews">
        <UserReviews user={user}/> 
      </Route>
    </div>
  )
}

export default App
