function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/profile">Profile</a>
                    <a className="nav-item nav-link" href="/destinations">Destinations</a>
                    <a className="nav-item nav-link" href="/reviews">Reviews</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar