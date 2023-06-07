import { Card, Container, Form, Button, FormControl } from "react-bootstrap";
import terniumLogo from "../img/logo-ternium.png";
import { Link } from "react-router-dom";

function PasswordCard(){
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card style={{ width: "25rem" }}>
                <Card.Body>
                    <Link to="/"><img src={terniumLogo} className="img-fluid" alt="Logo Ternium" /></Link>
                    <Card.Text className="text-muted text-cente mt-2">Ingrese su correo para buscar su cuenta.</Card.Text>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <FormControl type="email" placeholder="Correo electrónico" />
                        </Form.Group>
                        <Button
                            type="button"
                            className="mt-3 py-2 w-75"
                            variant="outline-danger"
                        >
                            Enviar un email
                        </Button>
                        <Link to="/">
                            <Button
                                type="button"
                                className="mt-3 py-2 w-75"
                                variant="outline-danger"
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