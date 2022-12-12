import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCart, fetchCart } from './store/cart.action'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import { CircularProgress, IconButton } from '@mui/material'
import { Button, Icon } from '@mui/material'

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

const CartList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.cart)
    const loading = useSelector((state) => state.cart.loading)

    const handleDelete = (id) => {
        dispatch(deleteCart({ id }))
    }

    const handleEdit = (id) => {
        navigate(`/cart/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/cart/add`)
    }

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        { field: 'coupon', headerName: 'Coupon', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'itemname', headerName: 'Itemname', width: 200 },
        { field: 'totalprice', headerName: 'Totalprice', width: 200 },
        {
            field: 'Actions',
            flex: 1,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                handleEdit(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                handleDelete(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Entities', path: '/cart' },
                        { name: 'Cart' },
                    ]}
                />
            </div>

            <Button
                onClick={() => {
                    handleAdd()
                }}
                color="primary"
                variant="contained"
            >
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                    Add Cart
                </Span>
            </Button>

            <SimpleCard title="Cart">
                {loading ? (
                    <div
                        title="loading"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress className="progress" />
                    </div>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                )}
            </SimpleCard>
        </Container>
    )
}

export default CartList
