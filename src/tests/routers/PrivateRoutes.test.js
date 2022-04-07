const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { AuthContext } = require("../../auth/authContext");
const { PrivateRoute } = require("../../routers/PrivateRoute");

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Hola Navigate :)</span>
}));

describe('Tests in <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn(); // Mock de la funcion setItem del localStorage

    test('should show the component if is authenticated and save it in the localstorage', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Luis'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Private component');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    })

    test('should block the component if it is not authenticated', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Hola Navigate :)');
    })
})