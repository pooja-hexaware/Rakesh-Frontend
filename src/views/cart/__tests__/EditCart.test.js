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
import EditCart from '../EditCart'
import { cartAdded } from '../store/cartSlice'
beforeAll(() => {
    store.dispatch(
        cartAdded({
            id: 1,
            coupon: 'coupon',
            price: 77,
            itemname: 'itemname',
            totalprice: 44,
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
                                element={<Navigate to="cart/edit/1" replace />}
                            />
                            <Route
                                path="cart/edit/:id"
                                element={<EditCart />}
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

describe('testing view of CartEdit Component', () => {
    test('should render EditCart and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCartButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const couponElement = screen.getByLabelText(/Coupon/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const totalpriceElement = screen.getByLabelText(/Totalprice/i)

        expect(saveCartButtonElement).toBeInTheDocument()

        expect(couponElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
        expect(itemnameElement).toBeInTheDocument()
        expect(totalpriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cart edit form', async () => {
        const couponElement = screen.getByLabelText(/Coupon/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const totalpriceElement = screen.getByLabelText(/Totalprice/i)

        fireEvent.change(couponElement, { target: { value: 'coupon' } })
        fireEvent.change(priceElement, { target: { value: 52 } })
        fireEvent.change(itemnameElement, { target: { value: 'itemname' } })
        fireEvent.change(totalpriceElement, { target: { value: 62 } })

        expect(couponElement.value).toBe('coupon')

        expect(priceElement.value).toBe('52')
        expect(itemnameElement.value).toBe('itemname')

        expect(totalpriceElement.value).toBe('62')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const couponElement = screen.getByLabelText(/Coupon/i)
        const priceElement = screen.getByLabelText(/Price/i)
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const totalpriceElement = screen.getByLabelText(/Totalprice/i)

        fireEvent.change(couponElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        fireEvent.change(itemnameElement, { target: { value: '' } })
        fireEvent.change(totalpriceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveCartButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCartButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
