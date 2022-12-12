const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import StoresList from '../StoresList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Stores rows when api response has data', async () => {
    const endPoint = 'stores'
    const getStoresListResponse = [
        {
            id: 1,
            storename: 'storename1',
            address: 'address1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStoresListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <StoresList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const storesStorenameCell = await screen.findByText(/storename1/i)

    expect(storesStorenameCell).toHaveTextContent(/storename1/i)
    mock.reset()
})
