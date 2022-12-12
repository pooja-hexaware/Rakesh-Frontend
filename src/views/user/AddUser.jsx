import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from './store/user.action'

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

const AddUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')

    const handleUserid = (e) => setUserid(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addUser({
                userid,
                password,
            })
        )
        navigate('/user')
    }

    useEffect(() => {
        return () => {
            setUserid('')
            setPassword('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddUser', path: '/user' },
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
                                name="userid"
                                id="useridInput"
                                onChange={handleUserid}
                                value={userid}
                                validators={['required']}
                                label="Userid"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="password"
                                id="passwordInput"
                                onChange={handlePassword}
                                value={password}
                                validators={['required']}
                                label="Password"
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

export default AddUser
