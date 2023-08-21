function Profile({ user }) {

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
                <div className="card-header">{user.username}</div>
                <div className="card-body">
                    {setUserTitle()}
                    <h3 className="pt-5 pr-1">Places you have been:</h3>
                    {user.destinations.length >= 1 ? user.destinations.map(destination => <h4>- {destination.city}, {destination.country}</h4>) : <h4>Nowhere yet :/</h4>}
                </div>
            </div>
            
            <br></br>
            
        </div>
    )
}

export default Profile