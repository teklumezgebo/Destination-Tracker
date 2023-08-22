import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import ReviewPage from './ReviewPage';
import UserReviews from './UserReviews';
import { useUserContext } from './UserContext';

function App() {

  const { user, setUser } = useUserContext()
  const [chosenDestination, setChosenDestination] = useState(localStorage.getItem('chosenDestination') || null)
  
  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      } else {
        res.json().then(() => <Login />)
      }
    })

    return () => {
      setUser(null)
    }

  }, [setUser])

  function currentDestination(destination) {
    setChosenDestination(destination)
    localStorage.setItem('chosenDestination', destination)
  }

  if (user === null) return (<Login />)

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Destinations onDestinationChange={currentDestination}/>
        </Route>
        <Route path="/reviewpage">
          <ReviewPage chosenDestination={chosenDestination}/>
        </Route>
        <Route exact path="/reviews">
          <UserReviews /> 
        </Route>
      </Switch>
    </div>
  )
}

export default App
