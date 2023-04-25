import React, { useState } from 'react';
import { Card, Container, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import terniumLogo from '../img/logo-ternium.png';
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const API = 'https://codextern.onrender.com/';

function LoginCard({ switchCard }) {

  const cookies = new Cookies;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeEmail = async (e) => {
    setEmail(e.target.value)
  };
  const handleChangePassword = async (e) => {
    setPassword(e.target.value)
  };

  const userLogin = async (e) => {
    e.preventDefault();
    let userData =  {
      "email": email,
      "password": password
    }

    fetch(`${API}auth/login`, {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify(userData)})
    .then((response) => response.json())
    .then((result) => {
      if (result.error){
        setErrorMessage("Credenciales incorrectas")
      }
      else if(result.token){
        cookies.set('token', result.token, {path: '/'});
        cookies.set('exp', result.exp, {path: '/'});
        cookies.set('user_id', result.user_id, {path: '/'});
        navigate('/homePage');
      }
    })
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <img src={terniumLogo} className="img-fluid" alt="Logo Ternium" />
          <Card.Text className="text-muted text-center mt-2">Sistema para equipo de talento</Card.Text>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={handleChangeEmail}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2" value={password} onChange={handleChangePassword}>
            <Form.Control type="password" placeholder="Contraseña" />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </Form.Group>

          <div className="mt-2">
              <Link to='/passwordReset'>Olvidé mi contraseña</Link>
          </div>

          <Button
            onClick={userLogin}
            type="submit"
            className="mt-3 py-2 w-75"
            variant='outline-danger'
          >
            Iniciar sesión
          </Button>


          <Button
            type="button"
            className="mt-3 py-2 w-75"
            variant='outline-danger'
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
          <Card.Text className="text-muted text-center mt-2">Sistema para equipo de talento</Card.Text>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Control type="password" placeholder="Confirmar la contraseña" />
          </Form.Group>

          <Button
            type="submit"
            className="mt-3 py-2 w-75"
            variant='outline-danger'
          >
            Registrarse
          </Button>
          <Button
            type="button"
            className="mt-3 py-2 w-75"
            variant='outline-danger'
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

  const [activeCard, setActiveCard] = useState('login');

  function switchCard() {
    setActiveCard(activeCard === 'login' ? 'register' : 'login');
  }

  return (
    <div>
      {activeCard === 'login' ? (
        <LoginCard switchCard={switchCard} />
      ) : (
        <RegisterCard switchCard={switchCard} />
      )}
    </div>
  );
}

export default LogIn;