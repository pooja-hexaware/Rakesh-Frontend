import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addStores } from './store/stores.action'

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

const AddStores = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storename, setStorename] = useState('')
    const [address, setAddress] = useState('')

    const handleStorename = (e) => setStorename(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addStores({
                storename,
                address,
            })
        )
        navigate('/stores')
    }

    useEffect(() => {
        return () => {
            setStorename('')
            setAddress('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddStores', path: '/stores' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
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
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddStores
