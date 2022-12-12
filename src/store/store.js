import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../views/cart/store/cartSlice'
import storesReducer from '../views/stores/store/storesSlice'
import toppingsReducer from '../views/toppings/store/toppingsSlice'
import menuReducer from '../views/menu/store/menuSlice'
import userReducer from '../views/user/store/userSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        user: userReducer,
        menu: menuReducer,
        toppings: toppingsReducer,
        stores: storesReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
