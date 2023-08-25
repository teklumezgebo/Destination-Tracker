import React from "react";
import UserReviewCards from "./UserReviewCards";
import { useUserContext } from "./UserContext";

function UserReviews() { 
    
    const { user } = useUserContext()
    
    return (
        <div>
            <br></br>
            {user.reviews.length >= 1 ? user.reviews.map(review => <UserReviewCards key={review.id} city={review.city} country={review.country} body={review.body} rating = {review.rating}/>) : <h1 className="text-center">No Reviews Yet!</h1>}
        </div>
    )
}

export default UserReviews