import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const UserList = Loadable(lazy(() => import('./UserList')))
const EditUser = Loadable(lazy(() => import('./EditUser')))
const AddUser = Loadable(lazy(() => import('./AddUser')))

const userRoutes = [
    {
        path: '/user',
        element: <UserList />,
    },
    {
        path: '/user/edit/:id',
        element: <EditUser />,
    },
    {
        path: '/user/add',
        element: <AddUser />,
    },
]

export default userRoutes
