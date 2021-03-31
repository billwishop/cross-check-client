import React, {useContext, useEffect} from 'react'
import {TenantContext} from './TenantProvider.js'
import AddBox from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import {Tenant} from './Tenant.js'
import './tenant.css'
import Input from '@material-ui/core/Input';


export const TenantList = props => {
    const {tenants, getTenants, searchTenants} = useContext(TenantContext)

    useEffect(() => {
        getTenants()
    }, [])

    return (
        <div className="tenant--list">
            <div className="tenants--header">
                <div className="tenants--label">Tenants</div>
                <div className="tenants--searchAdd">
                    <Input
                        className="search tenantSearch"
                        startAdornment={
                            <SearchIcon className="searchIcon icon"/> 
                        }
                        onChange={(e)=> {
                            searchTenants(e.target.value)
                        }}
                        placeholder={' Search'}
                        autoFocus={true}
                        />
                    <AddBox className="addIcon icon" 
                        onClick={()=> {
                            props.history.push("/tenants/create")
                        }} />
                </div>
                </div>
            <div className="tenants">
                {
                    tenants.map(tenant => <Tenant key={tenant.id} tenant={tenant} />)
                }
            </div>
        </div>
    )
}