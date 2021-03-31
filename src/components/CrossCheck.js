import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {ApplicationViews} from './ApplicationViews.js'
import {NavBar} from './nav/NavBar'
import {Login} from './auth/Login.js'
import {Register} from './auth/Register.js'
import './CrossCheck.css'

export const CrossCheck = () => (
    <>
        <Route render={()=> {
            if (localStorage.getItem('cc_token')) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to='./login' />
            }
        }} />

        <Route path='/login' render={props => <Login {...props} />} />
        <Route path='/register' render={props => <Register {...props} />} />
    </>    
)