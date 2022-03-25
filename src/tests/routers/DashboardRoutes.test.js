import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('tests in <DashboardRoutes />', () => {
    const contextValue = {
        user: {
            name: 'Luis',
            logged: true
        }
    }

    test('should show correctly - Marvel', () => {

        const wrapper = mount(
            <AuthContext.Provider
                value={ contextValue }
            >
                {/* initialEntries={ ['/'] } -> define en que ruta va a estar */}
                <MemoryRouter initialEntries={ ['/marvel'] }> {/* Provee el contexto suficiente para poder usar la navegacion */}
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // console.log(wrapper.html())
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Luis');
        expect( wrapper.find('h1').text().trim() ).toBe('MarvelScreen');
    })

    test('should show correctly - DC', () => {

        const wrapper = mount(
            <AuthContext.Provider
                value={ contextValue }
            >
                {/* initialEntries={ ['/'] } -> define en que ruta va a estar */}
                <MemoryRouter initialEntries={ ['/dc'] }> {/* Provee el contexto suficiente para poder usar la navegacion */}
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DcScreen');
    })
})