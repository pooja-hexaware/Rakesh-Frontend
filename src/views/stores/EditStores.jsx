import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editStores } from './store/stores.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditStores = () => {
    const { id: storesId } = useParams()

    const stores = useSelector((state) =>
        state.stores.entities.find(
            (stores) => stores.id.toString() === storesId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storename, setStorename] = useState(stores.storename)
    const [address, setAddress] = useState(stores.address)

    const handleStorename = (e) => setStorename(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editStores({
                id: storesId,
                storename,
                address,
            })
        )
        navigate('/stores')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditStores', path: '/stores' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="storename"
                                id="storenameInput"
                                onChange={handleStorename}
                                value={storename}
                                validators={['required']}
                                label="Storename"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditStores
