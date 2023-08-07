import 'bootstrap/dist/css/bootstrap.min.css'

function DestinationCard({ city, country, image, rating }) {
    return(
        <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top img-fluid" src={image} alt="Destination"></img>
            <div className="card-body">
                <h5 className="card-title">{city}, {country}</h5>
                <p className="card-text">{rating}</p>
                <button href="#" className="btn btn-primary">Leave a review</button>
            </div>
        </div>
    )
}

export default DestinationCard