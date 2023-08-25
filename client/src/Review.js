import React from "react"
import { useUserContext } from "./UserContext"

function Review({ id, username, rating, body, deleteReview, placeReview }) {
    
    const { user } = useUserContext()

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {rating === null ? null : <h6 className="card-subtitle mb-2 text-muted">{rating} ★</h6>}
                <p className="card-text">{body}</p>
                {username === user.username ? <div><button className="btn btn-dark" onClick={() => placeReview(body, rating)}>Edit</button><button className="btn btn-danger" onClick={() => deleteReview(id)}>Delete</button></div> : null}
            </div>
        </div>
    )
}

export default Review