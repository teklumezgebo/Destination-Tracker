function Profile({ user }) {

    console.log(user)
    
    function setUserTitle() {
        if (user.destinations.length === 0) {
            return <p>New Traveler</p>
        } else if (user.destinations.length > 0 && user.destinations.length <= 5) {
            return <p>Novice Traveler</p>
        } else if (user.destinations.length > 6 && user.destinations.length <= 15) {
            return <p>Experienced Traveler</p>
        } else if (user.destinations.length > 16) {
            return <p>Expert Traveler</p>
        }   
    }

    return(
        <div>
            <h3 className="text-left pt-5">{user.username}</h3>
            {setUserTitle()}
            <h1 className="pt-5 pr-1">Places you have been:</h1>
            <div>
                
            </div>
        </div>
    )
}

export default Profile