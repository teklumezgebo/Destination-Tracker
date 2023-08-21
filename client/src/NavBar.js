import React from "react"
import { useUserContext } from "./UserContext"

function NavBar() {
    
    const { setUser } = useUserContext()
    function logout() {
        fetch('/logout', {
            method: 'DELETE'
        })
    .then(() => {
      setUser(null)
    })
  }
    
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="/"><i className="fa-solid fa-house"></i></a>
                        <a className="nav-item nav-link" href="/profile">Profile</a>
                        <a className="nav-item nav-link" href="/reviews">Reviews</a>
                    </div>
                </div>
                <button type="button" className="btn btn-danger ml-auto" onClick={logout}>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar