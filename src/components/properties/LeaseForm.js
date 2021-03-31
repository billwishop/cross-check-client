import React, {useContext, useState, useEffect} from 'react'
import {PropertyContext} from './PropertyProvider'
import {TenantContext} from '../tenants/TenantProvider'
import { yearFirst } from '../utility/Date'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export const LeaseForm = props => {
    const {getSingleProperty, postLease} = useContext(PropertyContext)
    const {tenants, getTenants} = useContext(TenantContext)

    // State variable to control when the modal will appear
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    // State variables to hold selected lease dates
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());

    // State variable to hold the newly constructed lease
    const [lease, setLease] = useState({
        tenant:"",
        rent:""
    })

    useEffect(() => {
        getTenants()
        .then(getSingleProperty(props.match.params.property_id))
    }, [])


    const handleControlledInputChange = (event) => {
        const newLease = Object.assign({}, lease)          // Create copy
        newLease[event.target.name] = event.target.value    // Modify copy
        setLease(newLease)                                 // Set copy as new state
    }

    const constructLease = () => {
            // POST
            postLease(props.match.params.property_id, {
                tenant: lease.tenant,
                lease_start: yearFirst(selectedStartDate),
                lease_end: yearFirst(selectedEndDate),
                rent: lease.rent
            })
    }

    return (
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">Add Lease</DialogTitle>
        <DialogContent>
            <div className="lease--form--rent">
                <Input
                    id="standard-adornment-amount"
                    name="rent"
                    required={true}
                    onChange={handleControlledInputChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="lease--form--date">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                required={true}
                id="date-picker-inline"
                label="Lease Start Date"
                value={selectedStartDate}
                onChange={setSelectedStartDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </div>
            <div className="lease--form--date">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                required={true}
                id="date-picker-inline"
                label="Lease End Date"
                value={selectedEndDate}
                onChange={setSelectedEndDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </div>
        </MuiPickersUtilsProvider>
        <div className="lease--form--select">
            <InputLabel id="tenant-lease-select-label">Select Tenant</InputLabel>
            <Select
                labelId="tenant-lease-select-label"
                id="tenant-lease-select"
                required={true}
                onChange={handleControlledInputChange}
                name="tenant"
            >
                <MenuItem>Select Tenant</MenuItem>
                        {tenants.map(t => {
                            return (
                            <MenuItem value={t.id} key={t.id}>
                                {t.full_name}
                            </MenuItem>)})}
            </Select>
            </div>
            
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
            props.history.push(`/properties/${props.match.params.property_id}`)
        }} color="primary">
            Cancel
        </Button>
        <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    if (lease.tenant !== "" && lease.rent !== ""){
                    constructLease()
                    props.history.push(`/properties/${props.match.params.property_id}`)}
                    else {
                        alert("All fields are required")
                    }
                }} color="primary">
        Save Lease
        </Button>
        </DialogActions>
    </Dialog>
    </div>
    )



    
}