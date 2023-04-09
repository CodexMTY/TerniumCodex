import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import terniumLogo from "../img/Ternium_Logo.svg";

function LogInCard({ switchCard }) {
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
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button
            type="button"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
          >
            Log In
         </Button>

          <Button
            type="button"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
            onClick={switchCard}
          >
            Register
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
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicUsername" className="mt-2">
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button
            type="submit"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
          >
            Register
          </Button>
          <Button
            type="button"
            className="mt-3 py-2 w-75"
            style={{ backgroundColor: '#d14906', borderColor: '#d14906' }}
            onClick={switchCard}
          >
            Log In
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