import React from 'react'
import { Link } from 'react-router-dom'

function DestinationCard({ city, country, image, id }) {  
    return(
        <div className="card h-100 w-100 d-flex bg-dark mb-3 " style={{ width: "25rem" }}>
        <img className="card-img-bottom w-100 h-100" src={image} alt={`${city}, ${country}`}></img>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-white">{city}, {country}</h5>
                <button className="btn btn-primary text-white"><Link className='text-white' style={{ textDecoration: 'none' }} to={`/destinations/${id}`}>Leave a review</Link></button>
            </div>
        </div>
    )
}

export default DestinationCard