import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'
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

  if (user === null) return (<Login/>)

  return (
    <div>
      <NavBar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route path="/reviews" element={<UserReviews />}/>
        </Routes>
    </div>
  )
}

export default App
