import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'toppings'

export const fetchToppings = createAsyncThunk(
    'toppings/fetchToppings',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const toppings = await response.data
        return toppings
    }
)

export const addToppings = createAsyncThunk(
    'toppings/addToppings',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const toppings = await response.data
        thunkAPI.dispatch(showSuccess('Toppings added successfully'))
        return toppings
    }
)

export const editToppings = createAsyncThunk(
    'toppings/editToppings',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const toppings = await response.data
        thunkAPI.dispatch(showSuccess('Toppings updated successfully'))
        return toppings
    }
)

export const deleteToppings = createAsyncThunk(
    'toppings/deleteToppings',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected toppings deleted successfully.')
            )
            return data.id
        }
    }
)
