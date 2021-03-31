import React, {useContext, useState} from 'react'
import {PropertyContext} from './PropertyProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export const PropertyDeleteModal = props => {
    const {deleteProperty} = useContext(PropertyContext)
    const [open, setOpen] = useState(true);

const handleClose = () => {
setOpen(false);
};

return (
    <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
            <DialogTitle id="form-dialog-title">Delete Property</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this property? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    props.history.push("/properties")
                }} 
                color="primary">
                Cancel
                </Button>
                <Button onClick={() => {
                    deleteProperty(props.match.params.property_id)
                    props.history.push("/properties")
                }} 
                color="primary">
                Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}