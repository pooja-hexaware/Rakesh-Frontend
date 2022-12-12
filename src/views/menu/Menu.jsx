import React, { useState } from 'react'
import { styled } from '@mui/system'
import { AddToCartButton, SimpleCard } from 'components'

import { Icon, Typography, Card } from '@mui/material';
import { Box, Grid, Divider, } from '@mui/material';

import Button from '@mui/material/Button';
import axios from 'axios'
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ToppingsDialog from './ToppingsDialog';



const Container = styled('div')(({ theme }) => ({
    margin: '10px',
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const myStyle = {
    backgroundImage:
        "url('https://traveljingles.com/wp-content/uploads/2022/08/food.jpeg')",
    height: '100%',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const Menu = () => {
    const [menu, setMenu] = useState([])
    const [toppings, setToppings] = useState([])
    const [activeToppings, setActiveToppings] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemCount, setItemCount] = React.useState(1);
    const handleOpen = (toppings) => {
        setOpen(true);
        setActiveToppings(toppings);
    }
    const handleClose = () => setOpen(false);
    useEffect(() => {
        axios.get("http://localhost:4000/menu")
            .then(response => {
                setMenu(response.data)
            }, [])
    })

    return (
        <Container>
            <SimpleCard>
                <div>
                    <object align="right">
                        <AddToCartButton {...{ amount: 0 }} />
                    </object>
                    <h1>WiWi Food App(Capstone)</h1>
                </div>
            </SimpleCard>
            <Container style={myStyle}>
                <Card style={{ width: 650, height: 100, backgroundColor: 'lightskyblue', margin: '20px 310px 20px 20px', marginLeft: '400px', padding: '10px 20px 10px 10px' }}>
                    <Typography sx={{ fontSize: 20, textAlign: 'center', fontWeight: '500', color: 'white' }}>
                        Good food,Great time
                    </Typography>
                    <Typography sx={{ fontSize: 15, paddingTop: 2, paddingLeft: 1, color: 'white' }}>
                        Our chefs at WiWi make delicious food selections evey week-you pick,we cook and deliver.
                    </Typography>
                </Card>
                {menu.map((m) => {
                    return (
                        <Box sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', padding: '10px 20px 10px 10px', marginLeft: '280px' }}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography variant='h5'>
                                        {m.itemname}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6'>
                                        Amount {"  "}<TextField variant="outlined" size='small' sx={{ width: '100px' }} type={'number'} />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Typography color="text.secondary" variant="body2">
                                    <i>{m.itemdesc}</i>
                                </Typography>
                                <section style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <Typography variant='h6'>
                                        ${m.price} {"  "}
                                        <Button variant='contained' onClick={() => handleOpen(m.toppings)} size='small'><Icon>add</Icon>toppings</Button>
                                    </Typography>
                                    <Button variant='contained' size='small' ><Icon>add</Icon>Add</Button>
                                </section>
                            </Grid>
                            <Divider variant="middle" />
                        </Box>
                    )
                })}
            </Container>
            <Typography variant="h6" component="h2">
                <ToppingsDialog
                    open={open}
                    handleClose={handleClose}
                    toppings={activeToppings}
                />
            </Typography>
        </Container>
    );
}
export default Menu
