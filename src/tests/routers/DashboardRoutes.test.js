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

    test('should show correctly', () => {

        const wrapper = mount(
            <AuthContext.Provider
                value={ contextValue }
            >
                <MemoryRouter> {/* Provee el contexto suficiente para poder usar la navegacion */}
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // console.log(wrapper.html())
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Luis');
    })
})