import React from "react";
import UserReviewCards from "./UserReviewCards";
import { useUserContext } from "./UserContext";

function UserReviews() { 
    
    const { user } = useUserContext()
    
    return (
        <div>
            <div>
                <h1>Your Reviews:</h1>
            </div>
            <br></br>
            {user.reviews.length >= 1 ? user.reviews.map(review => <UserReviewCards key={review.id} city={review.city} country={review.country} body={review.body} rating = {review.rating}/>) : <h1>No Reviews Yet!</h1>}
        </div>
    )
}

export default UserReviews