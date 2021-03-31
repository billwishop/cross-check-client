import React, {useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PropertyContext} from './PropertyProvider'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


export const Property = ({ property }) => {
    const {getSingleProperty} = useContext(PropertyContext)
    const history = useHistory()
    const [expanded, setExpanded] = useState(false);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            padding: '1em',
            backgroundColor: '#E0E0E0'
        },
        title: {
            fontSize: 14,
            paddingLeft: '1em'
        },
        pos: {
            paddingLeft: '1em'
        },
        pos2: {
            paddingLeft: '1em',
            marginBottom: '15px'
        }
    });

    const classes = useStyles()
    
    return (
    <Card className={`card ${classes.root}`} variant='outlined'>
        <CardHeader
            title={
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    <Link to={`/properties/${property.id}`}>
                        <div>{ property.street }</div>
                    </Link>
                        <div>{property.city}, {property.state} {property.postal_code}</div>
                </Typography>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon onClick={(e)=>{
                    getSingleProperty(property.id)
                    .then(setExpanded(!expanded))
                }}/>
                </IconButton>
            }
        />
        <Divider className={classes.pos2} />
        <div className='tenant--options'>
            <div className={classes.options}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <EditIcon className={`editIcon icon ${classes.pos2}`} tooltip='EDIT BRO'
                    onClick={()=> {
                        getSingleProperty(property.id)
                        .then(history.push(`/properties/edit/${property.id}`))
                }} />
                <DeleteIcon className={`deleteIcon icon ${classes.pos2}`}  
                    onClick={()=> {
                        getSingleProperty(property.id)
                        .then(history.push(`/properties/delete/${property.id}`))
                    }} />
                </Collapse> 
            </div>
        </div>
    </Card>
    )
}