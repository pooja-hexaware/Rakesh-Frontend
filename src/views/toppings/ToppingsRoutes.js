import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ToppingsList = Loadable(lazy(() => import('./ToppingsList')))
const EditToppings = Loadable(lazy(() => import('./EditToppings')))
const AddToppings = Loadable(lazy(() => import('./AddToppings')))

const toppingsRoutes = [
    {
        path: '/toppings',
        element: <ToppingsList />,
    },
    {
        path: '/toppings/edit/:id',
        element: <EditToppings />,
    },
    {
        path: '/toppings/add',
        element: <AddToppings />,
    },
]

export default toppingsRoutes
