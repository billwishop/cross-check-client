import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export const Register = props => {

    const [user, setUser] = useState({})

    const handleControlledInputChange = (event) => {
        const loggedInUser = Object.assign({}, user)            // Create copy
        loggedInUser[event.target.name] = event.target.value    // Modify copy
        setUser(loggedInUser)                                   // Set copy as new state
    }

    const handleRegister = e => {
        e.preventDefault()
        
        if (user.password === user.verifyPassword) {
            const newUser = {
                "email": user.email,
                "password": user.password
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })

                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("cc_token", res.token)
                        props.history.push("/")
                    }
                })
        } else {
            alert("Passwords do not match") 
        }
    }

    return (
    <div>
    <Dialog open={true} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">Please create an account:</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={handleControlledInputChange}
        />
        <TextField
            margin="dense"
            label="Veryify Password"
            type="password"
            name="verifyPassword"
            fullWidth
            onChange={handleControlledInputChange}
        />
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
        <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    handleRegister(evt)
                }} color="primary">
                Register
        </Button>
        </DialogActions>
        <div className="login--link"><Link to="/login">Already registered?</Link></div>
        
    </Dialog>
    </div>
    )
}