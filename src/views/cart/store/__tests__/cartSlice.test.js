import store from 'store/store'
import { cartAdded, cartDeleted, cartUpdated } from '../cartSlice'

describe('testing cart redux store reducers', () => {
    test('add cart to store test', () => {
        let state = store.getState().cart
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            coupon: 'coupon',
            price: 55,
            itemname: 'itemname',
            totalprice: 14,
        }
        store.dispatch(cartAdded(initialInput))
        state = store.getState().cart
        expect(state.entities).toHaveLength(1)
    })

    test('update cart from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            coupon: 'coupon',
            price: 60,
            itemname: 'itemname',
            totalprice: 83,
        }
        store.dispatch(cartAdded(initialInput))
        let state = store.getState().cart
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            coupon: 'coupon1',
            price: 70,
            itemname: 'itemname1',
            totalprice: 19,
        }
        store.dispatch(cartUpdated(updatedInput))
        state = store.getState().cart
        let changedCart = state.entities.find((p) => p.id === 2)
        expect(changedCart).toStrictEqual(updatedInput)
    })

    test('delete cart from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            coupon: 'coupon',
            price: 64,
            itemname: 'itemname',
            totalprice: 51,
        }
        store.dispatch(cartAdded(initialInput))
        let state = store.getState().cart
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            cartDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().cart
        expect(state.entities).toHaveLength(2)
    })
})
