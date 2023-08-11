import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import ReviewPage from './ReviewPage';

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

  if (!user) return <Login onUserChange={currentUser}/> 
  
  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Route path="/profile">
        <Profile user={user}/>
      </Route>
      <Route path="/destinations" >
        <Destinations onChosenDestinationChange={onChosenDestinationChange}/>
      </Route>
      <Route path="/reviewpage" >
        <ReviewPage chosenDestination={chosenDestination} user={user}/>
      </Route>
    </div>
  )
}

export default App
