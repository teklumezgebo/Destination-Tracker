function UserReviewCards({ city, country, body, rating }) {
    return(
        <div className="card">
            <h5 className="card-header">{city}, {country}: {rating}★</h5>
            <div className="card-body">
                <p className="card-text">{body}</p>
            </div>
        </div>
    )
}

export default UserReviewCards