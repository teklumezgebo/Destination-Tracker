import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import Reviews from './Reviews';

function App() {

  const [user, setUser] = useState('ytesy')

  function currentUser(user) {
    setUser(user)
  }

  if (!user) { return (<Login onUserChange={currentUser}/>) }
  
  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Route exact path="/profile">
        <Profile user={user}/>
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
