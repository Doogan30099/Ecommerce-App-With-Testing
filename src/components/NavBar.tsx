import  {Container, Nav, Navbar as BsNavbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/UseAppDispatch';


export default function NavBar() {
    const cartCount = useAppSelector((state) => 
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <BsNavbar bg='dark' variant='dark' expand='lg' className='shadow-sm py-3 sticky-top'>
            <Container>
                <BsNavbar.Brand as={Link} to="/">E-Commerce</BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls='main-navbar' />
                <BsNavbar.Collapse id='main-navbar'>
                    <Nav className='ms-auto'>
                        <Nav.Link as={Link} to='/' className='mx-2'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/products' className='mx-2'>Products</Nav.Link>
                        <Nav.Link as={Link} to='/cart' className='mx-2'>Cart{" "}{cartCount > 0 && (
                            <Badge bg='light' text='dark' className='ms-1'>{cartCount}</Badge>
                        )}</Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};