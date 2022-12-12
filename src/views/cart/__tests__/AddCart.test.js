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
import AddCart from '../AddCart'

beforeEach(() => {
    const endPoint = 'cart'
    const getStudentListResponse = [
        {
            id: 1,
            coupon: 'coupon',
            price: 15,
            itemname: 'itemname',
            totalprice: 6,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddCart />
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

describe('testing view CartAdd Component', () => {
    test('should render AddCart and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCartButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const couponElement = screen.getByLabelText(/Coupon/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const totalpriceElement = screen.getByLabelText(/Totalprice/i)

        expect(addCartButtonElement).toBeInTheDocument()

        expect(couponElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(itemnameElement).toBeInTheDocument()
        expect(totalpriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cart add form', async () => {
        const couponElement = screen.getByLabelText(/Coupon/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const totalpriceElement = screen.getByLabelText(/Totalprice/i)

        fireEvent.change(couponElement, { target: { value: 'coupon' } })
        fireEvent.change(priceElement, { target: { value: 4 } })
        fireEvent.change(itemnameElement, { target: { value: 'itemname' } })
        fireEvent.change(totalpriceElement, { target: { value: 14 } })
    })

    test('should return error message when add Cart button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCartButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCartButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
