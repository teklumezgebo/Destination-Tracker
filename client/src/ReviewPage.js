import React, { useState } from "react";
// import Review from "./Review";

function ReviewPage({ chosenDestination, user }) {

    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')

    function onRatingChange(event) {
        setRating(event.target.value)
    }

    function onBodyChange(event){
        setBody(event.target.value)
    }
    
    function submitReview() {
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: body,
                rating: rating,
                destination_id: chosenDestination.id,
                user_id: user.id
            })
        })
        .then(res => res.json())
        .then(newReview => {
            console.log(newReview)
            // setBody('')
            // setRating('')
        })
    }

    return (
        <div>
            <h1>{chosenDestination.city}, {chosenDestination.country}    {chosenDestination.rating ? rating : 0}★</h1>
            <img src={chosenDestination.image} alt="place"></img>
            <br></br>
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="textarea">What did you think?</label>
                                <textarea className="form-control" id="textarea" rows="4" placeholder="Enter your review" value={body} onChange={onBodyChange}></textarea>
                                <br></br>
                                <input type="text" value={rating} onChange={onRatingChange}></input>
                                <button className="btn btn-dark" onClick={submitReview}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {}
        </div>
    )
}

export default ReviewPage