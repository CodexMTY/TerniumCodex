import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import terniumLogo from '../img/logo-ternium.png';
import Cookies from 'universal-cookie';
import BotonSubida from './BotonSubida';

function Header() {

    const cookies = new Cookies;
    const navigate = useNavigate();

    function handleLogOut() {
        cookies.remove('token', { path: '/' });
        cookies.remove('exp', { path: '/' });
        cookies.remove('user_id', { path: '/' });

        navigate('/');
    }

    function goHome() {
        navigate('/homePage');
    }

    return (
    <Navbar expand="lg" sticky="top" style={{ background: "white" }}>
        <Container>
            <div className="d-inline-block align-top" style={{ paddingRight: '30px' }}>
                <Link to='/homePage'><img src={terniumLogo} height="50" alt="Logo Ternium" /></Link>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={goHome}>
                        Inicio
                    </Nav.Link>
                    <BotonSubida />
                </Nav>

                <Nav className="me-auto">
                    
                </Nav>

                <Nav className="ml-auto">
                    <Button onClick={handleLogOut} variant='outline-danger'>Cerrar sesión</Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Header;