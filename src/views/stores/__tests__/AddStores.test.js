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
import AddStores from '../AddStores'

beforeEach(() => {
    const endPoint = 'stores'
    const getStudentListResponse = [
        {
            id: 1,
            storename: 'storename',
            address: 'address',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStores />
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

describe('testing view StoresAdd Component', () => {
    test('should render AddStores and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStoresButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const storenameElement = screen.getByLabelText(/Storename/i)
        const addressElement = screen.getByLabelText(/Address/i)

        expect(addStoresButtonElement).toBeInTheDocument()

        expect(storenameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Stores add form', async () => {
        const storenameElement = screen.getByLabelText(/Storename/i)
        const addressElement = screen.getByLabelText(/Address/i)

        fireEvent.change(storenameElement, { target: { value: 'storename' } })
        fireEvent.change(addressElement, { target: { value: 'address' } })
    })

    test('should return error message when add Stores button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStoresButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStoresButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
