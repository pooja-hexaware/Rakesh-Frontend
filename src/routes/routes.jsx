import NotFound from 'views/sessions/NotFound'
import cartRoutes from 'views/cart/CartRoutes'
import storesRoutes from 'views/stores/StoresRoutes'
import toppingsRoutes from 'views/toppings/ToppingsRoutes'
import menuRoutes from 'views/menu/MenuRoutes'
import userRoutes from 'views/user/UserRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...userRoutes,
                ...menuRoutes,
                ...toppingsRoutes,
                ...storesRoutes,
                ...cartRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
