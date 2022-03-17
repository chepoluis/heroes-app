import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('tests in <AppRouter />', () => { 
    
    test('should show login screen if the user is not logged in', () => {
        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        )

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('LoginScreen');
    })

    test('should show marvel screen if the user is logged in', () => {
        const contextValue = {
            user: {
                name: 'Luis',
                logged: true
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        )
        
        // console.log(wrapper.html())
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe( true ); // O tambien podria ser .toBeTruthy()
    })
})