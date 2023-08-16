import React from "react"
import { useEffect, useState } from "react"
import DestinationCard from "./DestinationCard"

function Destinations({ onChosenDestinationChange }) {

    const [destinations, setDestinations] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')
    const [form, setForm] = useState(false)
    
    useEffect(() => {
        fetch('/destinations')
        .then(res => res.json())
        .then(destinations => setDestinations(destinations))
    }, [])

    function onCityChange(event) {
        setCity(event.target.value)
    }

    function onCountryChange(event) {
        setCountry(event.target.value)
    }

    function onImageChange(event) {
        setImage(event.target.value)
    }

    function addDestination() {
        setForm(!form)
    }

    function clearInputFields() {
        setCity('')
        setCountry('')
        setImage('')
    }

    function onDestinationSubmit(event) {
        event.preventDefault()
        fetch('/destinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: city,
                country: country,
                image: image
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(newDestination => {
                    setDestinations([...destinations, newDestination])
                    clearInputFields()
                    setForm(false)
                })
            } else {
                console.log(res)
            }
        })
    }

    return(
        <div>
            <button className="btn btn-success" onClick={addDestination}>Add Destination</button>
            {form ? <form onSubmit={onDestinationSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                            <input type="text" className="form-control" id="inputCity" value={city} onChange={onCityChange} placeholder="City"></input>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                            <input type="text" className="form-control" id="inputCountry" value={country} onChange={onCountryChange} placeholder="Country"></input>
                            </div>
                        </div>
                        <div className="form-group col-md-6 mx-auto">
                            <input type="text" className="form-control" id="inputURL" value={image} onChange={onImageChange} placeholder="Image URL"></input>
                        </div>
                        <div className="text-center" >
                            <button type="submit" className="btn btn-dark btn-lg mx-auto">Add Destination</button>
                        </div>
                    </form> : null }
            <br></br>
            <div className=" d-flex justify-content-center">
                <div className="card-group">
                    {destinations.length === 0 ? null : destinations.map(destination => ( <div className="col-md-3 mb-4 pb-2"><DestinationCard key={destination.id} city={destination.city} country={destination.country} image={destination.image} rating={destination.rating} destination={destination} onChosenDestinationChange={onChosenDestinationChange}/></div> ))}
                </div>
            </div> 
        </div>
    )
}

export default Destinations