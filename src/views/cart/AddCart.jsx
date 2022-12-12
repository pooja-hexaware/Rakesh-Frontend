import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart } from './store/cart.action'

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

const AddCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [coupon, setCoupon] = useState('')
    const [price, setPrice] = useState('')
    const [itemname, setItemname] = useState('')
    const [totalprice, setTotalprice] = useState('')

    const handleCoupon = (e) => setCoupon(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))
    const handleItemname = (e) => setItemname(e.target.value)
    const handleTotalprice = (e) => setTotalprice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addCart({
                coupon,
                price,
                itemname,
                totalprice,
            })
        )
        navigate('/cart')
    }

    useEffect(() => {
        return () => {
            setCoupon('')
            setPrice('')
            setItemname('')
            setTotalprice('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddCart', path: '/cart' },
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
                                name="coupon"
                                id="couponInput"
                                onChange={handleCoupon}
                                value={coupon}
                                validators={['required']}
                                label="Coupon"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price || ''}
                                validators={['required']}
                                label="Price"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="itemname"
                                id="itemnameInput"
                                onChange={handleItemname}
                                value={itemname}
                                validators={['required']}
                                label="Itemname"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="totalprice"
                                id="totalpriceInput"
                                onChange={handleTotalprice}
                                value={totalprice || ''}
                                validators={['required']}
                                label="Totalprice"
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

export default AddCart
