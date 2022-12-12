import { createSlice } from '@reduxjs/toolkit'
import { fetchUser } from './user.action'
import { addUser } from './user.action'
import { editUser } from './user.action'
import { deleteUser } from './user.action'

const fetchUserExtraReducer = {
    [fetchUser.pending]: (state, action) => {
        state.loading = true
    },
    [fetchUser.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const addUserExtraReducer = {
    [addUser.pending]: (state, action) => {
        state.loading = true
    },
    [addUser.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const editUserExtraReducer = {
    [editUser.pending]: (state, action) => {
        state.loading = true
    },
    [editUser.fulfilled]: (state, action) => {
        const { id, userid, password } = action.payload
        const existingUser = state.entities.find(
            (user) => user.id.toString() === id.toString()
        )
        if (existingUser) {
            existingUser.userid = userid
            existingUser.password = password
        }
        state.loading = false
    },
    [editUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteUserExtraReducer = {
    [deleteUser.pending]: (state, action) => {
        state.loading = true
    },
    [deleteUser.fulfilled]: (state, action) => {
        const id = action.payload
        const existingUser = state.entities.find(
            (user) => user.id.toString() === id.toString()
        )
        if (existingUser) {
            state.entities = state.entities.filter((user) => user.id !== id)
        }
        state.loading = false
    },
    [deleteUser.rejected]: (state, action) => {
        state.loading = false
    },
}
const userSlice = createSlice({
    name: 'user',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        userAdded(state, action) {
            state.entities.push(action.payload)
        },
        userUpdated(state, action) {
            const { id, userid, password } = action.payload
            const existingUser = state.entities.find(
                (user) => user.id.toString() === id.toString()
            )
            if (existingUser) {
                existingUser.userid = userid
                existingUser.password = password
            }
        },
        userDeleted(state, action) {
            const { id } = action.payload
            const existingUser = state.entities.find(
                (user) => user.id.toString() === id.toString()
            )
            if (existingUser) {
                state.entities = state.entities.filter((user) => user.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchUserExtraReducer,
        ...addUserExtraReducer,
        ...editUserExtraReducer,
        ...deleteUserExtraReducer,
    },
})

export const { userAdded, userUpdated, userDeleted } = userSlice.actions

export default userSlice.reducer
