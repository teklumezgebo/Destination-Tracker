function Review({ username, rating, body, deleteReview, id, user }) {
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {rating === null ? null : <h6 className="card-subtitle mb-2 text-muted">{rating} ★</h6>}
                <p className="card-text">{body}</p>
                {username === user.username ? <div><button className="btn btn-dark">Edit</button><button className="btn btn-danger" onClick={deleteReview(id)}>Delete</button></div> : null}
            </div>
        </div>
    )
}

export default Review