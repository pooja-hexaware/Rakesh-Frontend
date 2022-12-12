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
import EditMenu from '../EditMenu'
import { menuAdded } from '../store/menuSlice'
beforeAll(() => {
    store.dispatch(
        menuAdded({
            id: 1,
            itemname: 'itemname',
            itemdesc: 'itemdesc',
            price: 49,
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
                                element={<Navigate to="menu/edit/1" replace />}
                            />
                            <Route
                                path="menu/edit/:id"
                                element={<EditMenu />}
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

describe('testing view of MenuEdit Component', () => {
    test('should render EditMenu and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const itemdescElement = screen.getByLabelText(/Itemdesc/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(saveMenuButtonElement).toBeInTheDocument()

        expect(itemnameElement).toBeInTheDocument()
        expect(itemdescElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Menu edit form', async () => {
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const itemdescElement = screen.getByLabelText(/Itemdesc/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(itemnameElement, { target: { value: 'itemname' } })
        fireEvent.change(itemdescElement, { target: { value: 'itemdesc' } })
        fireEvent.change(priceElement, { target: { value: 98 } })

        expect(itemnameElement.value).toBe('itemname')

        expect(itemdescElement.value).toBe('itemdesc')

        expect(priceElement.value).toBe('98')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const itemnameElement = screen.getByLabelText(/Itemname/i)
        const itemdescElement = screen.getByLabelText(/Itemdesc/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(itemnameElement, { target: { value: '' } })
        fireEvent.change(itemdescElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveMenuButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
