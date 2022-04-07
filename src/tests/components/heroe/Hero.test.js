import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Heroe } from "../../../components/heroe/Heroe";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('tests in <Hero />', () => {
    
    test('should not show Heroe screen if there is no a Heroe in the URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe']}>
                <Routes>
                    <Route path="/heroe" element={ <Heroe /> } />
                    <Route path="/" element={ <h1>No heroe page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('h1').text().trim() ).toBe('No heroe page');
    })
    
    test('should show a heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={ <Heroe /> } />
                    <Route path="/" element={ <h1>No heroe page</h1> } />
                </Routes>
            </MemoryRouter>
        );
        
        expect( wrapper.find('.row').exists() ).toBe(true);
    })

    test('should return to previous screen', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={ <Heroe /> } />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    })

    test('should show the No Hero Page if we do not have a heore', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider12342']}>
                <Routes>
                    <Route path="/heroe/:heroeId" element={ <Heroe /> } />
                    <Route path="/" element={ <h1>No heroe page</h1> } />
                </Routes>
            </MemoryRouter>
        );
        
        expect( wrapper.text() ).toBe('No heroe page');
    })
})