import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile';
import Destinations from './Destinations';
import Reviews from './Reviews';

function App() {

  const [user, setUser] = useState(null)

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
    setUser(() => user)
  }

  if (!user) return <Login onUserChange={currentUser}/> 
  
  return (
    <div>
      <NavBar onUserChange={currentUser}/>
      <Route path="/profile">
        <Profile user={user}/>
      </Route>
      <Route path="/destinations">
        <Destinations />
      </Route>
      <Route path="/reviews" user={user}>
        <Reviews />
      </Route>
    </div>
  )
}

export default App
