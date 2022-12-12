import React, { useState } from 'react'
import { styled } from '@mui/system'
import { AddToCartButton, SimpleCard } from 'components'
import { Grid, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'


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

const Home = () => {
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
            <Container>
            <Grid container spacing={5}>
                <Grid container item xs={4} >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qWASdBzRKexzs1fApYZBPXHYBujPRaq3mg&usqp=CAU"
                            alt="selfservice image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>Restaurant A</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <a href='/Menu' ><h4>Good food is directly proportional to the good life</h4></a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Grid>

                <Grid container item xs={4}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvstQOr8Y20vNaRDiF_W0oqq0T7arwoB_51Q&usqp=CAU"
                            alt="selfservice image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>Restaurant B</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <a href='/Menu' ><h4>You made us who we are today, so why we don't serve you the best we can ever have?</h4></a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Grid>

                <Grid container item xs={4} >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2oLQU6hR9ylUNoa0ysyrQl3go8RNgWk695g&usqp=CAU"
                            alt="selfservice image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>Restaurant C</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <a href='/Menu'><h4 color='black'>Where food speaks with your palate</h4></a>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Grid>
            </Grid>
            </Container>
        </Container>
    );
}
export default Home
