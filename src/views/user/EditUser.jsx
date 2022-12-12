import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editUser } from './store/user.action'
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

const EditUser = () => {
    const { id: userId } = useParams()

    const user = useSelector((state) =>
        state.user.entities.find(
            (user) => user.id.toString() === userId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userid, setUserid] = useState(user.userid)
    const [password, setPassword] = useState(user.password)

    const handleUserid = (e) => setUserid(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editUser({
                id: userId,
                userid,
                password,
            })
        )
        navigate('/user')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditUser', path: '/user' },
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

export default EditUser
