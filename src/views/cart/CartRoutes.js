import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const CartList = Loadable(lazy(() => import('./CartList')))
const EditCart = Loadable(lazy(() => import('./EditCart')))
const AddCart = Loadable(lazy(() => import('./AddCart')))

const cartRoutes = [
    {
        path: '/cart',
        element: <CartList />,
    },
    {
        path: '/cart/edit/:id',
        element: <EditCart />,
    },
    {
        path: '/cart/add',
        element: <AddCart />,
    },
]

export default cartRoutes
