import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'cart'

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get(`/${endPoint}`)
    const cart = await response.data
    return cart
})

export const addCart = createAsyncThunk(
    'cart/addCart',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const cart = await response.data
        thunkAPI.dispatch(showSuccess('Cart added successfully'))
        return cart
    }
)

export const editCart = createAsyncThunk(
    'cart/editCart',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const cart = await response.data
        thunkAPI.dispatch(showSuccess('Cart updated successfully'))
        return cart
    }
)

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected cart deleted successfully.')
            )
            return data.id
        }
    }
)
