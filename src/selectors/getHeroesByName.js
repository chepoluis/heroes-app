import { heroes } from '../data/heroes';
 
export const getHeroByName = ( name = '') => {
    name = name.toLocaleLowerCase();
    // return heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(name));
    
    /**
     * Retorna un array vacio si el name es un string vacio
     */
    if (name === '')
        return [];

    // Con esto se rompe la referencia al objeto por en de se crea otro array con los mismos objetos
    return [...heroes].filter(hero => hero.superhero.toLocaleLowerCase().includes(name));
}
