function Review({ review }) {
    return(
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{review.user.username}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{review.rating}</h6>
                <p class="card-text">{review.body}</p>
            </div>
        </div>
    )
}

export default Review