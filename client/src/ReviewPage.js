import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

function ReviewPage({ user }) {

    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')
    const [destination, setDestination] = useState()

    // const { id } = useParams()

    useEffect(() => {
        fetch("/destinations/3")
        .then(res => res.json())
        .then(destination => {
            setDestination(destination)
        })
    }, [])

    function onRatingChange(event) {
        setRating(event.target.textContent)
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
                destination_id: user.id,
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

    return (
        <div>
            {/* <h1>{destination.city}, {destination.country}    {destination.rating ? rating : 0}★</h1>
            <img src={destination.image} alt="place"></img> */}
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
                                        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {rating} ★
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>1</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>2</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>3</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>4</button>
                                            <button className="dropdown-item" type="button" onClick={onRatingChange}>5</button>
                                        </div>
                                        <button className="btn btn-dark" onClick={submitReview}>Post</button>
                                    </div>
                                </div>
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