import React from "react"

function UserReviewCards({ city, country, body}) {
    return(
        <div className="card bg-dark text-white w-10">
            <h5 className="card-header">{city}, {country}</h5>
            <div className="card-body">
                <p className="card-text">{body}</p>
            </div>
        </div>
    )
}

export default UserReviewCards