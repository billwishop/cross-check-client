import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons' 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const NavBar = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};
    return (
        <>
            <FontAwesomeIcon className='icon menuIcon fa-2x' icon={faBars}
            onClick={handleClick} />
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link className="nav-link" style={{ textDecoration: 'none', color: 'black' }} 
                    to="/">
                        HOME
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link className="nav-link" style={{ textDecoration: 'none', color: 'black' }} 
                    to="/tenants">
                        TENANTS
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link className="nav-link" style={{ textDecoration: 'none', color: 'black' }} 
                    to="/properties">
                        PROPERTIES
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon className='icon logOutIcon' icon={faSignOutAlt} 
                        onClick={() => {
                        localStorage.removeItem("cc_token")
                        props.history.push({ pathname: "/" })
                    }}/>
                </MenuItem>
            </Menu>
        </>
    )
}