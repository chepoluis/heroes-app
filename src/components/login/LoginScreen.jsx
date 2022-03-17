import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate(); // Regresa "mi" navigate, para navegar a otras pantallas
  
  const handleLogin = () => {

    const action = {
      type: types.login,
      payload: {
        name: 'Luis'
      }
    }

    dispatch(action);

    const lastPath = localStorage.getItem('lastPath') || '/marvel';

    navigate(lastPath, {
      replace: true // Remplaza la vista actual, para evitar que se pueda dar back a esta pagina
    });
  }

  return (
    <div className="container mt-5">
        <h1>LoginScreen</h1>
        <hr />

        <button 
          className="btn btn-primary"
          onClick={ handleLogin }
        >
          Login
        </button>
    </div>
    )
  }
  