import { createSlice } from '@reduxjs/toolkit'
import { fetchStores } from './stores.action'
import { addStores } from './stores.action'
import { editStores } from './stores.action'
import { deleteStores } from './stores.action'

const fetchStoresExtraReducer = {
    [fetchStores.pending]: (state, action) => {
        state.loading = true
    },
    [fetchStores.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchStores.rejected]: (state, action) => {
        state.loading = false
    },
}

const addStoresExtraReducer = {
    [addStores.pending]: (state, action) => {
        state.loading = true
    },
    [addStores.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addStores.rejected]: (state, action) => {
        state.loading = false
    },
}

const editStoresExtraReducer = {
    [editStores.pending]: (state, action) => {
        state.loading = true
    },
    [editStores.fulfilled]: (state, action) => {
        const { id, storename, address } = action.payload
        const existingStores = state.entities.find(
            (stores) => stores.id.toString() === id.toString()
        )
        if (existingStores) {
            existingStores.storename = storename
            existingStores.address = address
        }
        state.loading = false
    },
    [editStores.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteStoresExtraReducer = {
    [deleteStores.pending]: (state, action) => {
        state.loading = true
    },
    [deleteStores.fulfilled]: (state, action) => {
        const id = action.payload
        const existingStores = state.entities.find(
            (stores) => stores.id.toString() === id.toString()
        )
        if (existingStores) {
            state.entities = state.entities.filter((stores) => stores.id !== id)
        }
        state.loading = false
    },
    [deleteStores.rejected]: (state, action) => {
        state.loading = false
    },
}
const storesSlice = createSlice({
    name: 'stores',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        storesAdded(state, action) {
            state.entities.push(action.payload)
        },
        storesUpdated(state, action) {
            const { id, storename, address } = action.payload
            const existingStores = state.entities.find(
                (stores) => stores.id.toString() === id.toString()
            )
            if (existingStores) {
                existingStores.storename = storename
                existingStores.address = address
            }
        },
        storesDeleted(state, action) {
            const { id } = action.payload
            const existingStores = state.entities.find(
                (stores) => stores.id.toString() === id.toString()
            )
            if (existingStores) {
                state.entities = state.entities.filter(
                    (stores) => stores.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchStoresExtraReducer,
        ...addStoresExtraReducer,
        ...editStoresExtraReducer,
        ...deleteStoresExtraReducer,
    },
})

export const { storesAdded, storesUpdated, storesDeleted } = storesSlice.actions

export default storesSlice.reducer
