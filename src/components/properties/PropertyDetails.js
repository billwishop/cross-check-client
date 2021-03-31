import React, {useContext, useEffect, useState} from 'react'
import {PropertyContext} from './PropertyProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import { Lease } from './Lease.js';
import './properties.css'

export const PropertyDetails = props => {
    const {singleProperty, getSingleProperty} = useContext(PropertyContext)
    const [activeLeases, setLease] = useState([])
    const [inactiveLeases, setInactiveLeases] = useState([])

    useEffect(() => {
        if (!props.match.params.hasOwnProperty("lease_id")){
        getSingleProperty(parseInt(props.match.params.property_id))
        }
    },[])

    useEffect(() => {
        if (Object.keys(singleProperty).length > 0) { 
        const findLease = singleProperty.lease.filter(l => l.active === true)
        setLease(findLease)
        const findInactiveLeases = singleProperty.lease.filter(l => l.active === false)
        setInactiveLeases(findInactiveLeases)}
    }, [singleProperty])

    return (
        <section className="property--details">
            <div className="property--header">
                <div className="property--label">
                    <div>{singleProperty.street}</div>
                    <div>{singleProperty.city}, {singleProperty.state}, {singleProperty.postal_code}</div>
                </div>
                <div className="lease--add" onClick={()=>{
                            props.history.push(`/properties/${props.match.params.property_id}/lease`)
                        }}>
                    <div className="lease--addStatement">Add Lease Agreement</div> 
                    <AddBox className="addIcon icon addLeaseIcon" />
                </div>
            </div>
            <div className="leases">
                {Object.keys(singleProperty).length>0&&
                <div className="lease--current">
                    {activeLeases.length > 1 ? <div className="lease--header">Current Leases</div> :<div className="lease--header">Current Lease:</div>}
                    {activeLeases.length > 0
                    ? activeLeases.map(l => <Lease key={l.id} lease={l} propertyId={singleProperty.id} />)   
                    : <div className="lease--none">No active leases to display.</div>
                    }
                </div>}
                {Object.keys(singleProperty).length>0&&
                <div className="lease--inactive">
                    {inactiveLeases.length > 1 ? <div className="lease--header">Inactive Leases:</div> :<div className="lease--header">Inactive Lease:</div>}
                    {inactiveLeases.length > 0
                    ? inactiveLeases.map(l => <Lease key={l.id} lease={l} propertyId={singleProperty.id} />)   
                    : <div className="lease--none">No inactive leases to display.</div>
                    }
                </div>}
            </div>

        </section>
    )
}