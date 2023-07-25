function Destinations() {
    return(
        <div>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6 mx-auto">
                    <input type="text" className="form-control" id="inputCity" placeholder="City"></input>
                    </div>
                    <div className="form-group col-md-6 mx-auto">
                    <input type="text" className="form-control" id="inputCountry" placeholder="Country"></input>
                    </div>
                </div>
                <div className="form-group col-md-6 mx-auto">
                    <input type="text" className="form-control" id="inputURL" placeholder="Image URL"></input>
                </div>
                <div className="text-center" >
                    <button type="submit" className="btn btn-dark btn-lg mx-auto">Add Destination</button>
                </div>
            </form>
            {/* {list of destination cards} */}
        </div>
    )
}

export default Destinations