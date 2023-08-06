function Profile({ user }) {
    return(
        <div>
            <h3 className="text-left pt-5">{user.username}</h3>
            <p>Title based on how many destinations</p>
            <h1 className="pt-5 pr-1">Places you've been</h1>
            <div>
                {/* {list of destination cards} */}
            </div>
        </div>
    )
}

export default Profile