import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: (() => mockNavigate )
}));

describe('tests in <SearcScreen />', () => {
    test('should show correctly with the defaul values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}> {/**Siempre colocar el initalEntries con el path que corresponde */}
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Buscar un héroe');
    })

    test('should show Batman and the value in the input of queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    })

    test('should show and error if hero is not found', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No hay resultados batman123');
    })

    test('should to call navigate to the new screen', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        )

        /**
         * Se agrega 'batman' al input
         */
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        /**
         * Se simula el submit en el form
         */
        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        })

        /**
         * Revisa que el hook useNaviate fue llamado con el argumento '?q=batman';
         */
        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');
    })
})