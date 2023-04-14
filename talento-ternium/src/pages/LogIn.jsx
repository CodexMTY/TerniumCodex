import React, { useState } from 'react';
import { Card, Container, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import terniumLogo from '../img/Ternium_Logo.svg';
import '../css/LogIn.css';
import {Link} from 'react-router-dom';

function LogInCard({ switchCard }) {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <img src={terniumLogo} className="img-fluid" alt="Logo Ternium" />
        </Card.Body>
        <Card.Body>
          <Card.Text className="text-muted text-center">Sistema para equipo de talento</Card.Text>
        </Card.Body>
        <Card.Body>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" placeholder="Usuario" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Contraseña" />
            <div className="mt-2">
              <Link to='/passwordReset'>Olvidé mi contraseña</Link>
            </div>
          </Form.Group>

          <Button
            type="submit"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
          >
            Iniciar sesión
         </Button>

          <Button
            type="button"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
            onClick={switchCard}
          >
            Registrarse
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

function RegisterCard({ switchCard }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <img src={terniumLogo} className="img-fluid" alt="Card Image" />
        </Card.Body>
        <Card.Body>
          <Card.Text className="text-muted text-center">Sistema para equipo de talento</Card.Text>
        </Card.Body>
        <Card.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicUsername" className="mt-2">
            <Form.Control type="text" placeholder="Usuario" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Button
            type="submit"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
          >
            Registrarse
          </Button>
          <Button
            type="button"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
            onClick={switchCard}
          >
            Iniciar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

function LogIn() {
  const [activeCard, setActiveCard] = useState('login'); // default active card is 'login'

  function switchCard() {
    setActiveCard(activeCard === 'login' ? 'register' : 'login');
  }

  return (
    <div>
      {activeCard === 'login' ? (
        <LogInCard switchCard={switchCard} />
      ) : (
        <RegisterCard switchCard={switchCard} />
      )}
    </div>
  );
}

export default LogIn;