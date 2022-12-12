import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchStores,
    addStores,
    editStores,
    deleteStores,
} from '../stores.action'

const getStoresListResponse = [
    {
        id: 1,
        storename: 'storename',
        address: 'address',
    },
]

const addStoresListResponse = (data) => {
    return { id: 2, ...data }
}
const editStoresListResponse = (data) => {
    return data
}

describe('should test Stores redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'stores'
    test('Should be able to fetch the stores list and update stores redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getStoresListResponse)
        const result = await store.dispatch(fetchStores())
        const storesList = result.payload
        expect(result.type).toBe('stores/fetchStores/fulfilled')
        expect(storesList).toEqual(getStoresListResponse)

        const state = store.getState().stores
        expect(state.entities).toEqual(storesList)
    })

    test('Should be able to add new stores to list and make post api and update stores redux store', async () => {
        const body = {
            storename: 'storename',
            address: 'address',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addStoresListResponse(body)
        )
        const result = await store.dispatch(addStores(body))
        const storesItem = result.payload
        expect(result.type).toBe('stores/addStores/fulfilled')
        expect(storesItem).toEqual(addStoresListResponse(body))

        const state = store.getState().stores
        expect(state.entities).toContainEqual(addStoresListResponse(body))
    })

    test('Should be able to edit stores in list and make put api call and update stores redux store', async () => {
        const body = {
            id: 1,
            storename: 'storename',
            address: 'address',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editStoresListResponse(body)
        )
        const result = await store.dispatch(editStores(body))
        const storesItem = result.payload
        expect(result.type).toBe('stores/editStores/fulfilled')
        expect(storesItem).toEqual(editStoresListResponse(body))

        const state = store.getState().stores
        let changedStores = state.entities.find((p) => p.id === body.id)
        expect(changedStores.name).toEqual(body.name)
    })

    test('Should be able to delete stores in list and update stores redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().stores
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteStores(input))
        const deletId = result.payload
        expect(result.type).toBe('stores/deleteStores/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().stores
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
