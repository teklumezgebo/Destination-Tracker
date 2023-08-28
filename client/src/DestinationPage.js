import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Review from  './Review';

function DestinationPage() {
    
    const [destination, setDestination] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState(null)
    const [updateButton, setUpdateButton] = useState(false)
    const [error, setError] = useState(false)
    const { user } = useUserContext()

    const { id } = useParams()

    useEffect(() => {
        fetch(`/destinations/${id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(chosenDestination => setDestination(chosenDestination))
            } else {
                res.json().then(res => console.log(res))
            }
        })

        return () => {
            setDestination(null)
        }
        
    }, [id])

    // if destination is found with the id -> display / in the meantime <p>load....<p>

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

    function editReview(event) {
        event.preventDefault()
        const chosenReview = destination.reviews.find(review => review.user === user.username)
        fetch(`/reviews/${chosenReview.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destination_id: destination.id,
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
                res.json().then(res => {
                    setUpdateButton(false)
                    setError(res)
                })
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
    
    function submitReview(event) {
        event.preventDefault()
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: body,
                rating: rating,
                destination_id: destination.id
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
            {destination ? <div><div><h1 className="text-center">{destination.city}, {destination.country}</h1></div><div className="d-flex align-items-center justify-content-center"><br></br><img className=" d-flex align-items-center justify-content-center w-50 h-50" alt={destination.city} src={destination.image}></img></div></div> : <h2 className="text-center">Loading destination data...</h2>}
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
            {destination ? (destination.reviews.length >= 1 ? destination.reviews.map(review => <Review key={review.id} id={review.id} body={review.body} rating={review.rating} username={review.user} deleteReview={deleteReview} placeReview={placeReview}/> ) : <h3 className="text-center">Be the first to review!</h3>) : <p>Loading destination data...</p>}
        </div>
    )
}

export default DestinationPage