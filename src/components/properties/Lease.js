import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import { yearLast } from '../utility/Date'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const Lease = ({lease, propertyId}) => {
    const [expanded, setExpanded] = useState(false);

    const history = useHistory()

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
                    <Link to={`/tenants/${lease.tenant.id}`}>
                            {lease.tenant.full_name}
                    </Link>
                </Typography>
            }
            subheader={
            <div className="lease--options">
                <Typography variant="h7"  gutterBottom>
                    <div className="lease-rent">Rent:</div>
                    <div className="lease-rent">${lease.rent}</div>
                </Typography>
                <div className="lease--collapse">
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <DeleteIcon className={`deleteIcon leaseDeleteIcon icon`}  
                        onClick={()=> {
                            history.push(`/properties/${propertyId}/lease/delete/${lease.id}`)
                        }} />
                    </Collapse> 
                </div>
            </div>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon onClick={(e)=>{
                    // getSingleProperty(property.id)
                    setExpanded(!expanded)
                }}/>
                </IconButton>
            }
        />
        <Divider className={classes.pos2} />
        <Typography className={classes.pos}>Date range:</Typography>
        <Typography className={classes.pos}>{yearLast(lease.lease_start)} - {yearLast(lease.lease_end)}</Typography>
    </Card>
    )
}