import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMenu } from './store/menu.action'

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

const AddMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [itemname, setItemname] = useState('')
    const [itemdesc, setItemdesc] = useState('')
    const [price, setPrice] = useState('')

    const handleItemname = (e) => setItemname(e.target.value)
    const handleItemdesc = (e) => setItemdesc(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addMenu({
                itemname,
                itemdesc,
                price,
            })
        )
        navigate('/menu')
    }

    useEffect(() => {
        return () => {
            setItemname('')
            setItemdesc('')
            setPrice('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddMenu', path: '/menu' },
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
                                name="itemname"
                                id="itemnameInput"
                                onChange={handleItemname}
                                value={itemname}
                                validators={['required']}
                                label="Itemname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="itemdesc"
                                id="itemdescInput"
                                onChange={handleItemdesc}
                                value={itemdesc}
                                validators={['required']}
                                label="Itemdesc"
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

export default AddMenu
