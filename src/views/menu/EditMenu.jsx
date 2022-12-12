import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editMenu } from './store/menu.action'
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

const EditMenu = () => {
    const { id: menuId } = useParams()

    const menu = useSelector((state) =>
        state.menu.entities.find(
            (menu) => menu.id.toString() === menuId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [itemname, setItemname] = useState(menu.itemname)
    const [itemdesc, setItemdesc] = useState(menu.itemdesc)
    const [price, setPrice] = useState(menu.price)

    const handleItemname = (e) => setItemname(e.target.value)
    const handleItemdesc = (e) => setItemdesc(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editMenu({
                id: menuId,
                itemname,
                itemdesc,
                price,
            })
        )
        navigate('/menu')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditMenu', path: '/menu' },
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

export default EditMenu
