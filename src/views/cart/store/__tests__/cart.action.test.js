import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchCart, addCart, editCart, deleteCart } from '../cart.action'

const getCartListResponse = [
    {
        id: 1,
        coupon: 'coupon',
        price: 2,
        itemname: 'itemname',
        totalprice: 36,
    },
]

const addCartListResponse = (data) => {
    return { id: 2, ...data }
}
const editCartListResponse = (data) => {
    return data
}

describe('should test Cart redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'cart'
    test('Should be able to fetch the cart list and update cart redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getCartListResponse)
        const result = await store.dispatch(fetchCart())
        const cartList = result.payload
        expect(result.type).toBe('cart/fetchCart/fulfilled')
        expect(cartList).toEqual(getCartListResponse)

        const state = store.getState().cart
        expect(state.entities).toEqual(cartList)
    })

    test('Should be able to add new cart to list and make post api and update cart redux store', async () => {
        const body = {
            coupon: 'coupon',
            price: 80,
            itemname: 'itemname',
            totalprice: 4,
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addCartListResponse(body))
        const result = await store.dispatch(addCart(body))
        const cartItem = result.payload
        expect(result.type).toBe('cart/addCart/fulfilled')
        expect(cartItem).toEqual(addCartListResponse(body))

        const state = store.getState().cart
        expect(state.entities).toContainEqual(addCartListResponse(body))
    })

    test('Should be able to edit cart in list and make put api call and update cart redux store', async () => {
        const body = {
            id: 1,
            coupon: 'coupon',
            price: 85,
            itemname: 'itemname',
            totalprice: 67,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editCartListResponse(body)
        )
        const result = await store.dispatch(editCart(body))
        const cartItem = result.payload
        expect(result.type).toBe('cart/editCart/fulfilled')
        expect(cartItem).toEqual(editCartListResponse(body))

        const state = store.getState().cart
        let changedCart = state.entities.find((p) => p.id === body.id)
        expect(changedCart.name).toEqual(body.name)
    })

    test('Should be able to delete cart in list and update cart redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().cart
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteCart(input))
        const deletId = result.payload
        expect(result.type).toBe('cart/deleteCart/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().cart
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
