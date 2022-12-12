import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editCart } from './store/cart.action'
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

const EditCart = () => {
    const { id: cartId } = useParams()

    const cart = useSelector((state) =>
        state.cart.entities.find(
            (cart) => cart.id.toString() === cartId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [coupon, setCoupon] = useState(cart.coupon)
    const [price, setPrice] = useState(cart.price)
    const [itemname, setItemname] = useState(cart.itemname)
    const [totalprice, setTotalprice] = useState(cart.totalprice)

    const handleCoupon = (e) => setCoupon(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))
    const handleItemname = (e) => setItemname(e.target.value)
    const handleTotalprice = (e) => setTotalprice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editCart({
                id: cartId,
                coupon,
                price,
                itemname,
                totalprice,
            })
        )
        navigate('/cart')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditCart', path: '/cart' },
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

export default EditCart
