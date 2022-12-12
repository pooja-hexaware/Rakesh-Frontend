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
import EditStores from '../EditStores'
import { storesAdded } from '../store/storesSlice'
beforeAll(() => {
    store.dispatch(
        storesAdded({
            id: 1,
            storename: 'storename',
            address: 'address',
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
                                element={
                                    <Navigate to="stores/edit/1" replace />
                                }
                            />
                            <Route
                                path="stores/edit/:id"
                                element={<EditStores />}
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

describe('testing view of StoresEdit Component', () => {
    test('should render EditStores and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStoresButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const storenameElement = screen.getByLabelText(/Storename/i)
        const addressElement = screen.getByLabelText(/Address/i)

        expect(saveStoresButtonElement).toBeInTheDocument()

        expect(storenameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Stores edit form', async () => {
        const storenameElement = screen.getByLabelText(/Storename/i)
        const addressElement = screen.getByLabelText(/Address/i)

        fireEvent.change(storenameElement, { target: { value: 'storename' } })
        fireEvent.change(addressElement, { target: { value: 'address' } })

        expect(storenameElement.value).toBe('storename')

        expect(addressElement.value).toBe('address')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const storenameElement = screen.getByLabelText(/Storename/i)
        const addressElement = screen.getByLabelText(/Address/i)

        fireEvent.change(storenameElement, { target: { value: '' } })
        fireEvent.change(addressElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStoresButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStoresButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
