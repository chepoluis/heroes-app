import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('tests in authReducer', () => { 
    test('should return the default state', () => {
        
        const state = authReducer({ logged: false}, {});

        expect( state ).toEqual({ logged: false});
    })

    test('should authenticate and set the user "name"', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Luis'
            }
        }

        const state = authReducer({ logged: false}, action);

        expect( state ).toEqual({ 
            logged: true, 
            name: 'Luis'
        });
    })

    test('should delete user name and set logged in false', () => {
        const action = {
            type: types.logout,
        };

        const state = authReducer({ 
            logged: true, 
            name: 'Luis'
        }, action);

        expect( state ).toEqual({ logged: false });
    })
})