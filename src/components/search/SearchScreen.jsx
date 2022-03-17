import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm'
import { getHeroByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../heroe/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [ values, handleInputChange ] = useForm({
    searchText: q // Se pasa el parametro de busqueda q 
  });

  const { searchText } = values;
  const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${ searchText }`)
  }

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={ handleSearch }>
            <input
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              onChange={ handleInputChange }
              value={ searchText }
            />

            <button
              className="btn btn-outline-primary mt-1"
              type="submit"
            >
              Buscar...
            </button>
          </form>

        </div>

        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />

          {
            (q === '') 
              ? <div className='alert alert-info'> Buscar un héroe </div>
              : (heroesFiltered.length === 0)
                && <div className='alert alert-danger'>No hay resultados { q }</div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard 
                key={ hero.id }
                {...hero} // Se desestructuran todas las propiedades del objeto y se mandan como props
              />
            ))
          }
        </div>
      </div>
    </>
    )
}
  