import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";

// Ejemplo de importacion de una imagen estatica
// import spiderman from '../../assets/marvel-spider.jpg';
// const heroImages = require.context('../../assets', true); // Esto viene de webpack

export const Heroe = () => {
  const navigate = useNavigate();

  const { heroeId } = useParams();

  // Evita que se vuelva a llamar al momento de renderizar el componente
  const heroe = useMemo(() => getHeroById(heroeId), [ heroeId ]);

  const handleReturn = () => { 
    navigate(-1);
  }

  if (!heroe) // En los functional components siempre tienen que retornar un componente
    return <Navigate to="/" />

  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = heroe;

  // const imagePath = `/assets/${id}.jpg`; // Desde public/assets

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          // src={ imagePath }
          src={ heroImages(`./${ heroeId }.jpg`) }
          alt={ superhero }
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8 animate__animated animate__fadeInLeft">
        <h3>{ superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alger ego:</b> { alter_ego }</li>
          <li className="list-group-item"> <b>Publisher:</b> { publisher }</li>
          <li className="list-group-item"> <b>First appearance:</b> { first_appearance }</li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ characters }</p>

        <button
          className="btn btn-outline-info"
          onClick={ handleReturn }
        >
          Regresar
        </button>
      </div>

    </div>
  )
}
