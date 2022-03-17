import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

/**
 * Todas la rutas privadas pasan por aquí
 */
export const PrivateRoute = ({ children }) => {
    // console.log(children) // Un arreglo de componentes

    const { user } = useContext(AuthContext);
    const {  pathname, search } = useLocation();

    // localStorage.setItem('lastPath', `${ search === '' ? pathname : pathname + search }`); // Es mejor el codigo de abajo
    localStorage.setItem('lastPath', `${ pathname + search }`);

    /**
     * Los componentes siempre tienen que retornar un componente
     */
    return user.logged
        ? children
        : <Navigate to="/login" />
}
