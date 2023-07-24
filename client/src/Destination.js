import 'bootstrap/dist/css/bootstrap.min.css'

function Destination() {
    return(
        <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top img-fluid" src="https://placebear.com/g/200/200" alt="Card cap"></img>
            <div className="card-body">
                <h5 className="card-title">Name of Destination</h5>
                <p className="card-text">Information</p>
                <button href="#" className="btn btn-primary">Leave a review</button>
            </div>
        </div>
    )
}

export default Destination