import React, {useContext, useState} from 'react'
import {TenantContext} from './TenantProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export const TenantDeleteModal = props => {
    const {singleTenant, deleteTenant} = useContext(TenantContext)
    const [open, setOpen] = useState(true);

const handleClose = () => {
setOpen(false);
};

return (
    <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
            <DialogTitle id="form-dialog-title">Delete Tenant</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please note that by deleting this tenant, associated lease agreements and payments will also be deleted.  
                </DialogContentText>
                <DialogContentText>
                    Are you sure you want to delete this tenant? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    props.history.push("/tenants")
                }} 
                color="primary">
                Cancel
                </Button>
                <Button onClick={() => {
                    deleteTenant(singleTenant.id)
                    props.history.push("/tenants")
                }} 
                color="primary">
                Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}