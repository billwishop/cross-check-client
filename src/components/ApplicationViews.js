import React from 'react'
import {Route} from 'react-router-dom'
import { PaymentProvider } from './payments/PaymentProvider'
import { PaymentList } from './payments/PaymentsList'
import { PropertyList } from './properties/PropertyList'
import { PropertyProvider } from './properties/PropertyProvider'
import { TenantList } from './tenants/TenantList'
import { TenantProvider } from './tenants/TenantProvider'
import { TenantForm } from './tenants/TenantForm'
import { PropertyForm } from './properties/PropertyForm'
import { PropertyDetails } from './properties/PropertyDetails'
import { LeaseForm } from './properties/LeaseForm'
import { TenantDetails } from './tenants/TenantDetails'
import { PropertyDeleteModal } from './properties/PropertyDeleteModal'
import { TenantDeleteModal } from './tenants/DeleteModal'
import { LeaseDeleteModal } from './properties/LeaseDeleteModal'

export const ApplicationViews = () => {
    return (
        <>
            <PaymentProvider>
                <Route exact path="/" render={
                    props => <PaymentList {...props} />
                } />
            </PaymentProvider>
            <TenantProvider>
                <Route exact path="/tenants/create" render={
                    props => <TenantForm {...props} />
                } />
                <Route exact path="/tenants/edit/:tenant_id(\d+)" render={
                    props => <TenantForm {...props} />
                } />
                <Route exact path="/tenants/delete/:tenant_id(\d+)" render={
                    props => <TenantDeleteModal {...props} />
                } />
                <Route path="/tenants/create" render={
                    props => <TenantList {...props} />
                } />
                <Route path="/tenants/edit" render={
                    props => <TenantList {...props} />
                } />
                <Route path="/tenants/delete" render={
                    props => <TenantList {...props} />
                } />
                <Route exact path="/tenants" render={
                    props => <TenantList {...props} />
                } />
                <PaymentProvider>
                <Route exact path="/tenants/:tenant_id(\d+)" render={
                    props => <TenantDetails {...props} />
                } />
                </PaymentProvider>
            </TenantProvider>
            <PropertyProvider>
                <Route exact path="/properties/create" render={
                    props => <PropertyForm {...props} />
                } />
                <Route exact path="/properties/edit/:property_id(\d+)" render={
                    props => <PropertyForm {...props} />
                } />
                <Route exact path="/properties/delete/:property_id(\d+)" render={
                    props => <PropertyDeleteModal {...props} />
                } />
                <Route exact path="/properties" render={
                    props => <PropertyList {...props} />
                } />
                <Route path="/properties/create" render={
                    props => <PropertyList {...props} />
                } />
                <Route path="/properties/edit" render={
                    props => <PropertyList {...props} />
                } />
                <Route path="/properties/delete" render={
                    props => <PropertyList {...props} />
                } />
            <TenantProvider>
                <Route exact path="/properties/:property_id(\d+)/lease" render={
                    props => <LeaseForm {...props} />
                } />                
            </TenantProvider>
                <Route exact path="/properties/:property_id(\d+)" render={
                    props => <PropertyDetails {...props} />
                } />
                <Route path="/properties/:property_id(\d+)/lease/delete/:lease_id(\d+)" render={
                    props => <LeaseDeleteModal {...props} />
                } />
                <Route path="/properties/:property_id(\d+)/lease" render={
                    props => <PropertyDetails {...props} />
                } />
            </PropertyProvider>
        </>
    )
}