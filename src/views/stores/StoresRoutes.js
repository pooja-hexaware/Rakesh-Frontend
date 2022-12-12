import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const StoresList = Loadable(lazy(() => import('./StoresList')))
const EditStores = Loadable(lazy(() => import('./EditStores')))
const AddStores = Loadable(lazy(() => import('./AddStores')))

const storesRoutes = [
    {
        path: '/stores',
        element: <StoresList />,
    },
    {
        path: '/stores/edit/:id',
        element: <EditStores />,
    },
    {
        path: '/stores/add',
        element: <AddStores />,
    },
]

export default storesRoutes
