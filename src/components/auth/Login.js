import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export const Login = props => {

    const [user, setUser] = useState({})

    const handleControlledInputChange = (event) => {
        const loggedInUser = Object.assign({}, user)            // Create copy
        loggedInUser[event.target.name] = event.target.value    // Modify copy
        setUser(loggedInUser)                                   // Set copy as new state
    }

    const handleLogin = e => {
        e.preventDefault()

        return fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: user.email,
                password: user.password
            })
        })
            .then(r => r.json())
            .then(res => {
                if ('valid' in res && res.valid && 'token' in res) {
                    localStorage.setItem('cc_token', res.token)
                    props.history.push('/')
                }
                else {
                    alert("Email or password was not valid.")
                }
            })
    }

    return (
        <div>
    <Dialog open={true} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle id="form-dialog-title">Please sign in:</DialogTitle>
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
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
        <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    handleLogin(evt)
                }} color="primary">
                Login
        </Button>
        </DialogActions>
        <div className="register--link"><Link to="/register">Not a member yet?</Link></div>
        
    </Dialog>
    </div>
     
    )
}
