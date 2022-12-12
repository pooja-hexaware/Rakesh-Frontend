import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'user'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get(`/${endPoint}`)
    const user = await response.data
    return user
})

export const addUser = createAsyncThunk(
    'user/addUser',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const user = await response.data
        thunkAPI.dispatch(showSuccess('User added successfully'))
        return user
    }
)

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const user = await response.data
        thunkAPI.dispatch(showSuccess('User updated successfully'))
        return user
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected user deleted successfully.')
            )
            return data.id
        }
    }
)
