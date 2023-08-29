import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import HomePage from './HomePage';
import DestinationPage from './DestinationPage';
import Profile from './Profile';
import UserReviews from './UserReviews';
import { useUserContext } from './UserContext';

function App() {

  const { user, setUser } = useUserContext()
  const [destinations, setDestinations] = useState([])
  
  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      } else {
        res.json().then(() => <Login />)
      }
    })
  }, [setUser])

  useEffect(() => {
    fetch('/destinations')
    .then(res => res.json())
    .then(destinations => {
        setDestinations(destinations)
    })
  }, [])

  function onDestinationChange(destinations) {
    setDestinations(destinations)
  }

  if (user === null) return (<Login/>)

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/" element={<HomePage destinations={destinations} onDestinationChange={onDestinationChange} />} />
          <Route path="/destinations/:id" element={<DestinationPage destinations={destinations} />} />
          <Route path="/reviews" element={<UserReviews />}/>
        </Routes>
    </div>
  )
}

export default App
