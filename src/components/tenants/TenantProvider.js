import React from 'react'
import {useState} from 'react'


export const TenantContext = React.createContext()

export const TenantProvider = props => {
    const [tenants, setTenants] = useState([])
    const [singleTenant, setSingleTenant] = useState([])

    const getTenants = () => {
        return fetch("http://localhost:8000/tenants", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setTenants)
    }

    const getSingleTenant = id => {
        return fetch(`http://localhost:8000/tenants/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setSingleTenant)
    }

    const updateTenant = tenant => {
        return fetch(`http://localhost:8000/tenants/${tenant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(tenant)
        })
        .then(getTenants)
    }

    const deleteTenant = id => {
        return fetch(`http://localhost:8000/tenants/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(getTenants)
    }

    const postTenant = tenant => {
        return fetch("http://localhost:8000/tenants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            },
            body: JSON.stringify(tenant)
        })
        .then(getTenants)
    }

    const searchTenants = searchTerm => {
        return fetch(`http://localhost:8000/tenants?search=${searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("cc_token")}`
            }
        })
        .then(r => r.json())
        .then(setTenants)
    }

    return (
        <TenantContext.Provider value={{tenants, singleTenant, setSingleTenant, getTenants, getSingleTenant,
                                        updateTenant, deleteTenant, postTenant, searchTenants}}>
            {props.children}
        </TenantContext.Provider>
    )
}