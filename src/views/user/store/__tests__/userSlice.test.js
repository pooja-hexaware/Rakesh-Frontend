import store from 'store/store'
import { userAdded, userDeleted, userUpdated } from '../userSlice'

describe('testing user redux store reducers', () => {
    test('add user to store test', () => {
        let state = store.getState().user
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            userid: 'userid',
            password: 'password',
        }
        store.dispatch(userAdded(initialInput))
        state = store.getState().user
        expect(state.entities).toHaveLength(1)
    })

    test('update user from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            userid: 'userid',
            password: 'password',
        }
        store.dispatch(userAdded(initialInput))
        let state = store.getState().user
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            userid: 'userid1',
            password: 'password1',
        }
        store.dispatch(userUpdated(updatedInput))
        state = store.getState().user
        let changedUser = state.entities.find((p) => p.id === 2)
        expect(changedUser).toStrictEqual(updatedInput)
    })

    test('delete user from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            userid: 'userid',
            password: 'password',
        }
        store.dispatch(userAdded(initialInput))
        let state = store.getState().user
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            userDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().user
        expect(state.entities).toHaveLength(2)
    })
})
