import { createSlice } from '@reduxjs/toolkit'
import { fetchToppings } from './toppings.action'
import { addToppings } from './toppings.action'
import { editToppings } from './toppings.action'
import { deleteToppings } from './toppings.action'

const fetchToppingsExtraReducer = {
    [fetchToppings.pending]: (state, action) => {
        state.loading = true
    },
    [fetchToppings.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const addToppingsExtraReducer = {
    [addToppings.pending]: (state, action) => {
        state.loading = true
    },
    [addToppings.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const editToppingsExtraReducer = {
    [editToppings.pending]: (state, action) => {
        state.loading = true
    },
    [editToppings.fulfilled]: (state, action) => {
        const { id, tname, quantity } = action.payload
        const existingToppings = state.entities.find(
            (toppings) => toppings.id.toString() === id.toString()
        )
        if (existingToppings) {
            existingToppings.tname = tname
            existingToppings.quantity = quantity
        }
        state.loading = false
    },
    [editToppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteToppingsExtraReducer = {
    [deleteToppings.pending]: (state, action) => {
        state.loading = true
    },
    [deleteToppings.fulfilled]: (state, action) => {
        const id = action.payload
        const existingToppings = state.entities.find(
            (toppings) => toppings.id.toString() === id.toString()
        )
        if (existingToppings) {
            state.entities = state.entities.filter(
                (toppings) => toppings.id !== id
            )
        }
        state.loading = false
    },
    [deleteToppings.rejected]: (state, action) => {
        state.loading = false
    },
}
const toppingsSlice = createSlice({
    name: 'toppings',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        toppingsAdded(state, action) {
            state.entities.push(action.payload)
        },
        toppingsUpdated(state, action) {
            const { id, tname, quantity } = action.payload
            const existingToppings = state.entities.find(
                (toppings) => toppings.id.toString() === id.toString()
            )
            if (existingToppings) {
                existingToppings.tname = tname
                existingToppings.quantity = quantity
            }
        },
        toppingsDeleted(state, action) {
            const { id } = action.payload
            const existingToppings = state.entities.find(
                (toppings) => toppings.id.toString() === id.toString()
            )
            if (existingToppings) {
                state.entities = state.entities.filter(
                    (toppings) => toppings.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchToppingsExtraReducer,
        ...addToppingsExtraReducer,
        ...editToppingsExtraReducer,
        ...deleteToppingsExtraReducer,
    },
})

export const { toppingsAdded, toppingsUpdated, toppingsDeleted } =
    toppingsSlice.actions

export default toppingsSlice.reducer
