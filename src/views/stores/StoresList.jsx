import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteStores, fetchStores } from './store/stores.action'
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

const StoresList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.stores)
    const loading = useSelector((state) => state.stores.loading)

    const handleDelete = (id) => {
        dispatch(deleteStores({ id }))
    }

    const handleEdit = (id) => {
        navigate(`/stores/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/stores/add`)
    }

    useEffect(() => {
        dispatch(fetchStores())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        { field: 'storename', headerName: 'Storename', width: 200 },
        { field: 'address', headerName: 'Address', width: 200 },
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
                        { name: 'Entities', path: '/stores' },
                        { name: 'Stores' },
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
                    Add Stores
                </Span>
            </Button>

            <SimpleCard title="Stores">
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

export default StoresList
