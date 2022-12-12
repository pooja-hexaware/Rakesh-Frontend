const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import CartList from '../CartList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Cart rows when api response has data', async () => {
    const endPoint = 'cart'
    const getCartListResponse = [
        {
            id: 1,
            coupon: 'coupon1',
            price: 55,
            itemname: 'itemname1',
            totalprice: 1,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getCartListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <CartList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const cartCouponCell = await screen.findByText(/coupon1/i)

    expect(cartCouponCell).toHaveTextContent(/coupon1/i)
    mock.reset()
})
