const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditUser from '../EditUser'
import { userAdded } from '../store/userSlice'
beforeAll(() => {
    store.dispatch(
        userAdded({
            id: 1,
            userid: 'userid',
            password: 'password',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="user/edit/1" replace />}
                            />
                            <Route
                                path="user/edit/:id"
                                element={<EditUser />}
                            />
                        </Routes>
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

describe('testing view of UserEdit Component', () => {
    test('should render EditUser and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveUserButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const useridElement = screen.getByLabelText(/Userid/i)
        const passwordElement = screen.getByLabelText(/Password/i)

        expect(saveUserButtonElement).toBeInTheDocument()

        expect(useridElement).toBeInTheDocument()
        expect(passwordElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of User edit form', async () => {
        const useridElement = screen.getByLabelText(/Userid/i)
        const passwordElement = screen.getByLabelText(/Password/i)

        fireEvent.change(useridElement, { target: { value: 'userid' } })
        fireEvent.change(passwordElement, { target: { value: 'password' } })

        expect(useridElement.value).toBe('userid')

        expect(passwordElement.value).toBe('password')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const useridElement = screen.getByLabelText(/Userid/i)
        const passwordElement = screen.getByLabelText(/Password/i)

        fireEvent.change(useridElement, { target: { value: '' } })
        fireEvent.change(passwordElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveUserButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveUserButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
