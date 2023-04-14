import { Card, Container, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import terniumLogo from '../img/Ternium_Logo.svg';
import {Link} from 'react-router-dom';

function PasswordCard(){
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Link to='/'><img src={terniumLogo} className="img-fluid" alt="Logo Ternium" /></Link>
                    <Card.Text className="text-muted text-cente mt-2">Ingrese su correo para buscar su cuenta.</Card.Text>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <FormControl type="email" placeholder="Correo electrónico" />
                        </Form.Group>
                        <Button
                            type="button"
                            className="mt-3 py-2 w-75"
                            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
                        >
                            Submit
                        </Button>
                        <Link to='/'>
                            <Button
                                type="button"
                                className="mt-3 py-2 w-75"
                                style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
                            >
                                Regresar
                            </Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

function PasswordReset(){
    return (
        <div>
            <PasswordCard />
        </div>
    );
}

export default PasswordReset;