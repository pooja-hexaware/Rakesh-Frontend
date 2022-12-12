const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import UserList from '../UserList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render User rows when api response has data', async () => {
    const endPoint = 'user'
    const getUserListResponse = [
        {
            id: 1,
            userid: 'userid1',
            password: 'password1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getUserListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <UserList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const userUseridCell = await screen.findByText(/userid1/i)

    expect(userUseridCell).toHaveTextContent(/userid1/i)
    mock.reset()
})
