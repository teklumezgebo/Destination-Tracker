import { useEffect, useState } from "react";
import Review from  './Review';
// import { useParams } from "react-router-dom";

function ReviewPage({ user }) {

    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')
    const [destination, setDestination] = useState()

    // const { id } = useParams()

    useEffect(() => {
        fetch("/destinations/1")
        .then(res => res.json())
        .then(destination => {
            setDestination(destination)
        })
    }, [])

    function onRatingChange(event) {
        setRating(parseInt(event.target.textContent))
    }

    function onBodyChange(event){
        setBody(event.target.value)
    }

    function deleteReview(id) {
        fetch(`/reviews/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const filteredList = destination.reviews.filter(review => review.id !== id)
            setDestination(filteredList)
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
                    console.log(review)
                    setBody('')
                    setRating('')
                })
            } else {
                res.json().then(res => console.log(res))
            }
        })
    }

    console.log(destination)

    return (
        <div>
            {destination ? <h1 className="text-center">{destination.city}, {destination.country}    {destination.rating ? rating : 0}★</h1> : <p>Loading destination data...</p>}
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
                                        <button className="btn btn-success" onClick={submitReview}>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            {destination ? destination.reviews.length === 0 ? <h3>Be the first to review!</h3> : destination.reviews.map(review => <Review key={review.id} id={review.id} body={review.body} rating={review.rating} username={review.user} deleteReview={deleteReview} user={user}/> ) : <p>Loading destination data...</p>}
        </div>
    )
}

export default ReviewPage