import { mount } from "enzyme";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Tests in <LoginScreen />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should match with the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should call dispatch and navigation', () => {
        // wrapper.find('button').simulate('click');
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Luis'
            }
        });

        expect( mockNavigate ).toHaveBeenCalledWith("/marvel", {replace: true});

        localStorage.setItem('lastPath', '/dc');

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith("/dc", {"replace": true});
    })
})