import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import Review from  './Review';

function ReviewPage({ chosenDestination }) {

    const [destination, setDestination] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState(null)
    const [updateButton, setUpdateButton] = useState(false)
    const [error, setError] = useState(false)
    const { user } = useUserContext()
    
    useEffect(() => {
        fetch(`/destinations/${chosenDestination}`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(destination => {
                setDestination(destination)
                setError(false)
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })

        return () => {
            setDestination('')
        }
        
    }, [chosenDestination])

    function onRatingChange(event) {
        setRating(parseInt(event.target.textContent))
    }

    function onBodyChange(event){
        setBody(event.target.value)
    }

    function placeReview(body, rating) {
        setBody(body)
        setRating(rating)
        setUpdateButton(true)
    }

    function editReview() {
        const chosenReview = destination.reviews.find(review => review.user === user.username)
        fetch(`/reviews/${chosenReview.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: chosenReview.id,
                body: body,
                rating: rating
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(editedReview => {
                    editedReview.user = editedReview.user.username
                    const updatedReviews = destination.reviews.map(review => {
                        if (review.user === editedReview.user) {
                            return editedReview
                        }
                        return review
                    })
                    destination.reviews = updatedReviews
                    setBody('')
                    setRating(null)
                    setUpdateButton(false)
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    function deleteReview(id) {
        fetch(`/reviews/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const filteredList = destination.reviews.filter(review => review.id !== id)
            destination.reviews = filteredList
            setError(null)
        })
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
                destination_id: destination.id,
                user_id: user.id
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(review => {
                    const reviewObj = {
                        id: review.id,
                        body: review.body,
                        rating: review.rating,
                        user: user.username
                    }
                    const addedReviews = [...destination.reviews, reviewObj]
                    destination.reviews = addedReviews
                    setBody('')
                    setRating(null)
                    setError(false)
                })
            } else {
                res.json().then(res => setError(res))
            }
        })
    }

    return (
        <div>
            {destination ? <h1 className="text-center">{destination.city}, {destination.country}</h1> : <p>Loading destination data...</p>}
            <br></br>
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="textarea">What did you think?</label> 
                                <textarea className="form-control" id="textarea" rows="4" placeholder="Enter your review" value={body} onChange={onBodyChange}></textarea>
                                <br></br>
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {rating} ★
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>0</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>1</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>2</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>3</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>4</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>5</button>
                                        </div>
                                        {updateButton ? <button className="btn btn-success" onClick={editReview}>Update</button> : <button className="btn btn-success" onClick={submitReview}>Post</button>}
                                    </div>
                                    <br></br>
                                    {error ? <p className="text-center text-danger font-weight-bold">{error.errors ? error.errors.map(message => message) : error.error}</p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {destination ? (destination.reviews.length >= 1 ? destination.reviews.map(review => <Review key={review.id} id={review.id} body={review.body} rating={review.rating} username={review.user} deleteReview={deleteReview} placeReview={placeReview} user={user}/> ) : <h3>Be the first to review!</h3>) : <p>Loading destination data...</p>}
        </div>
    )
}

export default ReviewPage