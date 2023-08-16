import 'bootstrap/dist/css/bootstrap.min.css'
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
  const [chosenDestination, setChosenDestination] = useState('')

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      } else {
        console.log(res)
      }
    })
  }, [])

  function currentUser(user) {
    setUser(user)
  }

  function onChosenDestinationChange(destination) {
    setChosenDestination(destination)
  }

  console.log(user)

  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Route path="/login">
        <Login onUserChange={currentUser}/>
      </Route>
      <Route path="/profile">
        {user ? <Profile user={user}/> : <Login onUserChange={currentUser}/>}
      </Route>
      <Route path="/destinations">
        {user ? <Destinations onChosenDestinationChange={onChosenDestinationChange}/> : <Login onUserChange={currentUser}/>}
      </Route>
      <Route path="/reviewpage">
        {user ? <ReviewPage chosenDestination={chosenDestination} user={user}/> : <Login onUserChange={currentUser}/>}
      </Route>
      <Route path="/reviews">
        {user ? <UserReviews user={user}/> : <Login onUserChange={currentUser}/>}
      </Route>
    </div>
  )
}

export default App
