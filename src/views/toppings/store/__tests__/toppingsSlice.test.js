import store from 'store/store'
import {
    toppingsAdded,
    toppingsDeleted,
    toppingsUpdated,
} from '../toppingsSlice'

describe('testing toppings redux store reducers', () => {
    test('add toppings to store test', () => {
        let state = store.getState().toppings
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            tname: 'tname',
            quantity: 'quantity',
        }
        store.dispatch(toppingsAdded(initialInput))
        state = store.getState().toppings
        expect(state.entities).toHaveLength(1)
    })

    test('update toppings from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            tname: 'tname',
            quantity: 'quantity',
        }
        store.dispatch(toppingsAdded(initialInput))
        let state = store.getState().toppings
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            tname: 'tname1',
            quantity: 'quantity1',
        }
        store.dispatch(toppingsUpdated(updatedInput))
        state = store.getState().toppings
        let changedToppings = state.entities.find((p) => p.id === 2)
        expect(changedToppings).toStrictEqual(updatedInput)
    })

    test('delete toppings from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            tname: 'tname',
            quantity: 'quantity',
        }
        store.dispatch(toppingsAdded(initialInput))
        let state = store.getState().toppings
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            toppingsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().toppings
        expect(state.entities).toHaveLength(2)
    })
})
