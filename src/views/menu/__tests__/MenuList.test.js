const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import MenuList from '../MenuList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Menu rows when api response has data', async () => {
    const endPoint = 'menu'
    const getMenuListResponse = [
        {
            id: 1,
            itemname: 'itemname1',
            itemdesc: 'itemdesc1',
            price: 2,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getMenuListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <MenuList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const menuItemnameCell = await screen.findByText(/itemname1/i)

    expect(menuItemnameCell).toHaveTextContent(/itemname1/i)
    mock.reset()
})
