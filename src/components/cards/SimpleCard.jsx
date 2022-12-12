import React from 'react'
import { Card, colors } from '@mui/material'
import { styled, Box } from '@mui/system'

const CardRoot = styled(Card)(() => ({
    height: '100%',
    // padding: '10px',
    backgroundColor:'skyblue',
    color:'white'
}))

const CardTitle = styled('div')(({ subtitle }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: !subtitle && "16px",
}))

const SimpleCard = ({ children, title, subtitle, icon }) => {
    return (
        <CardRoot elevation={6}>
            <CardTitle subtitle={subtitle}>
                {title}
            </CardTitle>
            {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
            {children}
        </CardRoot>
    )
}

export default SimpleCard