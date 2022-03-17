import { types } from "../types/types"

/**
 * Example:
 * 
 * const sate = {
 *      name: 'Luis',
 *      logged: true
 * }
 * 
 * const loginAction = {
 *  type: types.login,
 *  payload: {
 *      name: 'Luis',
 *      email: 'asd@asd.com' 
 *  }
 * }
 */


/**
 * Los reducers NO TIENEN QUE SALIRSE DE SU FUNCION PARA REALIZAR EL TRABAJO
 * lo tienen que hacer dentro de la misma función
 */
export const authReducer = (state = {}, action) => {
    
    switch (action.type) {

        case types.login:
            return {
                ...action.payload, // Tambien se podria hacer action.payload.name, action.payload.email, etc...
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }

        default:
            return state;
    }
}