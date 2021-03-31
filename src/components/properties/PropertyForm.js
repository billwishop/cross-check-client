import React, {useContext, useState, useEffect} from 'react'
import {PropertyContext} from './PropertyProvider'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export const PropertyForm = props => {
    const {singleProperty, getSingleProperty,
        updateProperty, postProperty, setSingleProperty} = useContext(PropertyContext)
    
    // State variable to control when the modal will appear
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const [property, setProperty] = useState({
        street:"",
        city:"",
        state:"",
        postal_code:""
    })
    
    const editMode = props.match.params.hasOwnProperty("property_id")

    useEffect(() => {
        if (editMode){
            getSingleProperty(parseInt(props.match.params.property_id))
        }
    }, [])

    useEffect(() => {
        setProperty(singleProperty)
    }, [singleProperty])

    const handleControlledInputChange = (event) => {
        const newProperty = Object.assign({}, property)          // Create copy
        newProperty[event.target.name] = event.target.value      // Modify copy
        setProperty(newProperty)                                 // Set copy as new state
    }

    const constructProperty = () => {
        if (editMode) {
            // PUT
            updateProperty({
                id: singleProperty.id,
                street: property.street,
                city: property.city,
                state: property.state,
                postal_code: property.postal_code
            }) .then(setSingleProperty({}))
        } else {
            // POST
            postProperty({
                street: property.street,
                city: property.city,
                state: property.state,
                postal_code: property.postal_code
            })
        }
    }


    return (
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">{editMode ? "Update Property" : "Add Property"}</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Street"
            type="text"
            name="street"
            fullWidth
            defaultValue={editMode ?singleProperty.street : ""}
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="City"
            type="text"
            name="city"
            fullWidth
            defaultValue={editMode ?singleProperty.city :""}
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="State"
            type="state"
            name="state"
            fullWidth
            defaultValue={editMode ?singleProperty.state :""}
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="Postal Code"
            type="postal_code"
            name="postal_code"
            fullWidth
            defaultValue={editMode ?singleProperty.postal_code :""}
            onChange={handleControlledInputChange}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
            setSingleProperty([])
            props.history.push("/properties")
        }} color="primary">
            Cancel
        </Button>
        <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    constructProperty()
                    props.history.push("/properties")
                }} color="primary">
        {editMode ? "Save Updates" : "Add property"}
        </Button>
        </DialogActions>
    </Dialog>
    </div>
    )
}