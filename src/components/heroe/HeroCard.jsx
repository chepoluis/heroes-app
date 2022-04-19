import { Link } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}) => {

    const imagePath = `/assets/${id}.jpg`

    return (
        /**
         * Se utiliza junto la clase row para hacer row y columns
         */
        <div className="col animate__animated animate__fadeIn"> 
            <div className="card">

                <div className="row no-gutters">
                    <div className="col-4">
                        <img 
                            // src={ imagePath }
                            src={ heroImages(`./${id}.jpg`) } 
                            alt={ superhero }
                            className="card-img-top" 
                        />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                        </div>

                        {
                            (alter_ego !== characters) &&
                                <p className="text-muted">{ characters }</p>
                        }

                        <p className="card-text">
                            <small className="text-muted">{first_appearance}</small>
                        </p>

                        <Link to={`/heroe/${id}`}>
                            Más...
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    )
}
