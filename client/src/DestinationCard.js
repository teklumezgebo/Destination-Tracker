import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function DestinationCard({ city, country, image, rating, id }) {
        
    return(
        <div className="card h-100 w-100 d-flex bg-dark mb-3 " style={{ width: "25rem" }}>
        <img className="card-img-bottom " src={image} alt={`${city}, ${country}`}></img>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{city}, {country}</h5>
                {rating ? <p className="card-text text-primary">{rating} ★</p> : <p className="card-text text-primary">0 ★</p> }
                <button className="btn btn-primary text-white" href="/reviewpage"><Link className='text-white' style={{ textDecoration: 'none' }} to={`destinations/${id}`}>Leave a review</Link></button>
            </div>
        </div>
    )
}

export default DestinationCard