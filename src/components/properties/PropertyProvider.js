import React from 'react'
import {useState} from 'react'

export const PropertyContext = React.createContext()

export const PropertyProvider = props => {
    const [properties, setProperties] = useState([])
    const [singleProperty, setSingleProperty] = useState([])

    const getProperties = () => {
        return fetch("http://localhost:8000/properties", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setProperties)
    }

    const getSingleProperty = id => {
        return fetch(`http://localhost:8000/properties/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setSingleProperty)
    }

    const updateProperty = property => {
        return fetch(`http://localhost:8000/properties/${property.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(property)
        })
        .then(getProperties)
    }

    const deleteProperty = id => {
        return fetch(`http://localhost:8000/properties/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(getProperties)
    }

    const postProperty = property => {
        return fetch("http://localhost:8000/properties", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(property)
        })
        .then(getProperties)
    }

    const postLease = (propertyId, lease) => {
        return fetch(`http://localhost:8000/properties/${propertyId}/lease`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(lease)
        })
        .then(()=> getSingleProperty(propertyId))
    }
    const deleteLease = (propertyId, leaseId) => {
        return fetch(`http://localhost:8000/properties/${propertyId}/lease`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify({lease_id: leaseId})
        })
        .then(()=> getSingleProperty(propertyId))
    }

    const searchProperties = searchTerm => {
        return fetch(`http://localhost:8000/properties?search=${searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setProperties)
    }

    return (
        <PropertyContext.Provider value={{properties, setSingleProperty, singleProperty, getProperties, getSingleProperty,
                                            updateProperty, deleteProperty, postProperty,
                                            postLease, deleteLease, searchProperties}}>
            {props.children}
        </PropertyContext.Provider>
    )
}