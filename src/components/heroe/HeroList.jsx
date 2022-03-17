import React, { useMemo } from 'react'
import { HeroCard } from './HeroCard';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'

export const HeroList = ({ publisher = '' }) => {
    /**
     * Para estos casos se puede implementar un useMemo para que se memorise los valores
     * ya que puede haber el caso en donde se necesite hacer llamadas a API's y puede requerir
     * muchos recursos
     */
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); // Se puede mandar un arreglo vacio, si es que no hay alguna dependencia

    return (
        /**
         * rows-cols-1: pantallas pequeñas muestra solo de 1 por row
         * row-cols-md-3: pantallas mediandas muestra de 3 por row
         * g-3: separacion entre las cards
         */
        <div className='row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>  {/** Las clases de animate se aplican a todos los componentes hijos */}
            {
                heroes.map( heroe => (
                    <HeroCard 
                        key={ heroe.id }
                        { ...heroe } // Desestrura todo el objeto, y nos ahorra el tiempo de escribir cada prop individualmente
                    />
                ))
            }
        </div>
    )
}
