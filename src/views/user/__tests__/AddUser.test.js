const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddUser from '../AddUser'

beforeEach(() => {
    const endPoint = 'user'
    const getStudentListResponse = [
        {
            id: 1,
            userid: 'userid',
            password: 'password',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddUser />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view UserAdd Component', () => {
    test('should render AddUser and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addUserButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const useridElement = screen.getByLabelText(/Userid/i)
        const passwordElement = screen.getByLabelText(/Password/i)

        expect(addUserButtonElement).toBeInTheDocument()

        expect(useridElement).toBeInTheDocument()
        expect(passwordElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of User add form', async () => {
        const useridElement = screen.getByLabelText(/Userid/i)
        const passwordElement = screen.getByLabelText(/Password/i)

        fireEvent.change(useridElement, { target: { value: 'userid' } })
        fireEvent.change(passwordElement, { target: { value: 'password' } })
    })

    test('should return error message when add User button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addUserButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addUserButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
