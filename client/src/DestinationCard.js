import 'bootstrap/dist/css/bootstrap.min.css'

function DestinationCard() {
    return(
        <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top img-fluid" src="https://placebear.com/g/200/200" alt="Destination"></img>
            <div className="card-body">
                <h5 className="card-title">Name of Destination</h5>
                <p className="card-text"># of travelers</p>
                <button href="#" className="btn btn-primary">Leave a review</button>
            </div>
        </div>
    )
}

export default DestinationCard