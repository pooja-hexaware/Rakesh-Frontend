import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchUser, addUser, editUser, deleteUser } from '../user.action'

const getUserListResponse = [
    {
        id: 1,
        userid: 'userid',
        password: 'password',
    },
]

const addUserListResponse = (data) => {
    return { id: 2, ...data }
}
const editUserListResponse = (data) => {
    return data
}

describe('should test User redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'user'
    test('Should be able to fetch the user list and update user redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getUserListResponse)
        const result = await store.dispatch(fetchUser())
        const userList = result.payload
        expect(result.type).toBe('user/fetchUser/fulfilled')
        expect(userList).toEqual(getUserListResponse)

        const state = store.getState().user
        expect(state.entities).toEqual(userList)
    })

    test('Should be able to add new user to list and make post api and update user redux store', async () => {
        const body = {
            userid: 'userid',
            password: 'password',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addUserListResponse(body))
        const result = await store.dispatch(addUser(body))
        const userItem = result.payload
        expect(result.type).toBe('user/addUser/fulfilled')
        expect(userItem).toEqual(addUserListResponse(body))

        const state = store.getState().user
        expect(state.entities).toContainEqual(addUserListResponse(body))
    })

    test('Should be able to edit user in list and make put api call and update user redux store', async () => {
        const body = {
            id: 1,
            userid: 'userid',
            password: 'password',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editUserListResponse(body)
        )
        const result = await store.dispatch(editUser(body))
        const userItem = result.payload
        expect(result.type).toBe('user/editUser/fulfilled')
        expect(userItem).toEqual(editUserListResponse(body))

        const state = store.getState().user
        let changedUser = state.entities.find((p) => p.id === body.id)
        expect(changedUser.name).toEqual(body.name)
    })

    test('Should be able to delete user in list and update user redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().user
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteUser(input))
        const deletId = result.payload
        expect(result.type).toBe('user/deleteUser/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().user
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
