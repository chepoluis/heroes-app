import { mount } from "enzyme"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { AuthContext } from "../../../auth/authContext"
import { Navbar } from "../../../components/ui/Navbar"
import { types } from "../../../types/types"

const mockNavigate = jest.fn();

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useReducer: (() => mockUseReducer)
// }));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: (() => mockNavigate)
}));

describe('tests in <Navbar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Luis',
            logged: true
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
                {/* Esto funciona tambien */}
                {/* <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes> */}
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('should show the component correctly', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( contextValue.user.name );
    })

    test('should call logout, call navigate and dispatch with the arguments', () => {

        wrapper.find('button').simulate('click');

        expect( contextValue.dispatch ).toHaveBeenCalledWith({'type': types.logout});
        expect( mockNavigate ).toHaveBeenCalledWith('/login', {
            replace: true
        });
    })    
})