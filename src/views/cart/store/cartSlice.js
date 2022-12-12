import { createSlice } from '@reduxjs/toolkit'
import { fetchCart } from './cart.action'
import { addCart } from './cart.action'
import { editCart } from './cart.action'
import { deleteCart } from './cart.action'

const fetchCartExtraReducer = {
    [fetchCart.pending]: (state, action) => {
        state.loading = true
    },
    [fetchCart.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchCart.rejected]: (state, action) => {
        state.loading = false
    },
}

const addCartExtraReducer = {
    [addCart.pending]: (state, action) => {
        state.loading = true
    },
    [addCart.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addCart.rejected]: (state, action) => {
        state.loading = false
    },
}

const editCartExtraReducer = {
    [editCart.pending]: (state, action) => {
        state.loading = true
    },
    [editCart.fulfilled]: (state, action) => {
        const { id, coupon, price, itemname, totalprice } = action.payload
        const existingCart = state.entities.find(
            (cart) => cart.id.toString() === id.toString()
        )
        if (existingCart) {
            existingCart.coupon = coupon
            existingCart.price = price
            existingCart.itemname = itemname
            existingCart.totalprice = totalprice
        }
        state.loading = false
    },
    [editCart.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteCartExtraReducer = {
    [deleteCart.pending]: (state, action) => {
        state.loading = true
    },
    [deleteCart.fulfilled]: (state, action) => {
        const id = action.payload
        const existingCart = state.entities.find(
            (cart) => cart.id.toString() === id.toString()
        )
        if (existingCart) {
            state.entities = state.entities.filter((cart) => cart.id !== id)
        }
        state.loading = false
    },
    [deleteCart.rejected]: (state, action) => {
        state.loading = false
    },
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        cartAdded(state, action) {
            state.entities.push(action.payload)
        },
        cartUpdated(state, action) {
            const { id, coupon, price, itemname, totalprice } = action.payload
            const existingCart = state.entities.find(
                (cart) => cart.id.toString() === id.toString()
            )
            if (existingCart) {
                existingCart.coupon = coupon
                existingCart.price = price
                existingCart.itemname = itemname
                existingCart.totalprice = totalprice
            }
        },
        cartDeleted(state, action) {
            const { id } = action.payload
            const existingCart = state.entities.find(
                (cart) => cart.id.toString() === id.toString()
            )
            if (existingCart) {
                state.entities = state.entities.filter((cart) => cart.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchCartExtraReducer,
        ...addCartExtraReducer,
        ...editCartExtraReducer,
        ...deleteCartExtraReducer,
    },
})

export const { cartAdded, cartUpdated, cartDeleted } = cartSlice.actions

export default cartSlice.reducer
