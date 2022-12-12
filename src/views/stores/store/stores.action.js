import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'stores'

export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
    const response = await axios.get(`/${endPoint}`)
    const stores = await response.data
    return stores
})

export const addStores = createAsyncThunk(
    'stores/addStores',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const stores = await response.data
        thunkAPI.dispatch(showSuccess('Stores added successfully'))
        return stores
    }
)

export const editStores = createAsyncThunk(
    'stores/editStores',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const stores = await response.data
        thunkAPI.dispatch(showSuccess('Stores updated successfully'))
        return stores
    }
)

export const deleteStores = createAsyncThunk(
    'stores/deleteStores',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected stores deleted successfully.')
            )
            return data.id
        }
    }
)
