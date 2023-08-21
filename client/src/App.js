import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
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
  const [chosenDestination, setChosenDestination] = useState(null)
  
  
  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      } else {
        res.json().then(res => console.log(res))
      }
    })
  }, [setUser])

  function currentUser(user) {
    setUser(user)
  }

  function currentDestination(destination) {
    setChosenDestination(destination)
  }

  if (user === null) return (<Login onUserChange={currentUser}/>)

  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Switch>
        <Route exact path="/profile">
          <Profile user={user}/>
        </Route>
        <Route exact path="/">
          <Destinations onDestinationChange={currentDestination}/>
        </Route>
        <Route path="/reviewpage">
          <ReviewPage user={user} chosenDestination={chosenDestination}/>
        </Route>
        <Route exact path="/reviews">
          <UserReviews user={user}/> 
        </Route>
      </Switch>
    </div>
  )
}

export default App
