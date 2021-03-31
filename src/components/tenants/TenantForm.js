import React, {useContext, useState, useEffect} from 'react'
import {TenantContext} from './TenantProvider'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export const TenantForm = props => {
    const {singleTenant, getSingleTenant, setSingleTenant, updateTenant, postTenant} = useContext(TenantContext)

    // for edit mode - a new tenant will be constructed 
    // and set before being passed into updateTenant()
    const [tenant, setTenant] = useState({
        phone_number:"",
        email:"",
        full_name:""
    })

    const editMode = props.match.params.hasOwnProperty("tenant_id")

    useEffect(() => {
        if (props.match.params.hasOwnProperty("tenant_id")){
            getSingleTenant(parseInt(props.match.params.tenant_id))
        }
    }, [])

    useEffect(() => {
        setTenant(singleTenant)
    }, [singleTenant])


    const handleControlledInputChange = (event) => {
        const newTenant = Object.assign({}, tenant)          // Create copy
        newTenant[event.target.name] = event.target.value    // Modify copy
        setTenant(newTenant)                                 // Set copy as new state
    }

    const constructTenant = () => {
        if (editMode) {
            // PUT
            updateTenant({
                id: singleTenant.id,
                phone_number: tenant.phone_number,
                email: tenant.email,
                full_name: tenant.full_name
            }) .then(setSingleTenant([]))
        } else {
            // POST
            postTenant({
                phone_number: tenant.phone_number,
                email: tenant.email,
                full_name: tenant.full_name
            })
        }
    }
    
    return (
    <div>
    <Dialog open={true} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">{editMode ? "Update Tenant" : "Add Tenant"}</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="full_name"
            fullWidth
            defaultValue={editMode ?singleTenant.full_name : ""}
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            name="phone_number"
            fullWidth
            defaultValue={editMode ?singleTenant.phone_number :""}
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            defaultValue={editMode ?singleTenant.email :""}
            onChange={handleControlledInputChange}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
            setSingleTenant([])
            props.history.push("/tenants")
        }} color="primary">
            Cancel
        </Button>
        <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    constructTenant()
                    props.history.push("/tenants")
                }} color="primary">
        {editMode ? "Save Updates" : "Add Tenant"}
        </Button>
        </DialogActions>
    </Dialog>
    </div>
    )
}