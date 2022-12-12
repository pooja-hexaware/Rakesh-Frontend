import store from 'store/store'
import { storesAdded, storesDeleted, storesUpdated } from '../storesSlice'

describe('testing stores redux store reducers', () => {
    test('add stores to store test', () => {
        let state = store.getState().stores
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            storename: 'storename',
            address: 'address',
        }
        store.dispatch(storesAdded(initialInput))
        state = store.getState().stores
        expect(state.entities).toHaveLength(1)
    })

    test('update stores from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            storename: 'storename',
            address: 'address',
        }
        store.dispatch(storesAdded(initialInput))
        let state = store.getState().stores
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            storename: 'storename1',
            address: 'address1',
        }
        store.dispatch(storesUpdated(updatedInput))
        state = store.getState().stores
        let changedStores = state.entities.find((p) => p.id === 2)
        expect(changedStores).toStrictEqual(updatedInput)
    })

    test('delete stores from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            storename: 'storename',
            address: 'address',
        }
        store.dispatch(storesAdded(initialInput))
        let state = store.getState().stores
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            storesDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().stores
        expect(state.entities).toHaveLength(2)
    })
})
