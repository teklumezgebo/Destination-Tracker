import React from "react"
import { useUserContext } from "./UserContext"

function Profile() {

    const { user } = useUserContext()

    function setUserTitle() {
        if (user.destinations.length === 0) {
            return <h5>New Traveler</h5>
        } else if (user.destinations.length > 0 && user.destinations.length <= 5) {
            return <h5>Novice Traveler</h5>
        } else if (user.destinations.length >= 6 && user.destinations.length <= 15) {
            return <h5>Experienced Traveler</h5>
        } else if (user.destinations.length >= 16) {
            return <h5>Expert Traveler</h5>
        }   
    }

    return(
        <div className="container d-flex align-items-center justify-content-center vh-100" >
            <div className="card text-white bg-dark mb-3">
                <div className="card-header">{user.username.toUpperCase()} {setUserTitle()}</div>
                <div className="card-body">
                    <h3>Places you have been:</h3>
                    {user.destinations.length >= 1 ? user.destinations.map(destination => <h5 key={destination.id}>- {destination.city}, {destination.country}</h5>) : <h4>Nowhere yet :/</h4>}
                </div>
            </div>
        </div>
    )
}

export default Profile