import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToppings } from './store/toppings.action'

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

const AddToppings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tname, setTname] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleTname = (e) => setTname(e.target.value)
    const handleQuantity = (e) => setQuantity(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addToppings({
                tname,
                quantity,
            })
        )
        navigate('/toppings')
    }

    useEffect(() => {
        return () => {
            setTname('')
            setQuantity('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddToppings', path: '/toppings' },
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
                                name="tname"
                                id="tnameInput"
                                onChange={handleTname}
                                value={tname}
                                validators={['required']}
                                label="Tname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="quantity"
                                id="quantityInput"
                                onChange={handleQuantity}
                                value={quantity}
                                validators={['required']}
                                label="Quantity"
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

export default AddToppings
