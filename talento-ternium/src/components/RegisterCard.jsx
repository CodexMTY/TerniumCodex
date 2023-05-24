import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import terniumLogo from '../img/logo-ternium.png';

const API = 'https://codextern-4ny2.onrender.com/';

function RegisterCard({ switchCard }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
      setPassword(event.target.value)
    };

    const handleChangePasswordConfirmation = (event) => {
      setPasswordConfirmation(event.target.value)
    };

    const handleChangeName = (event) => {
      setName(event.target.value)
    };
  
    const handleChangeLastName = (event) => {
      setLastName(event.target.value)
    };

    const validateEmail = (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!value) {
        return 'Email is required.';
      }
      if (!emailRegex.test(value)) {
        return 'Invalid email address.';
      }
      return '';
    };

    const userRegister = async (e) => {

      const emailError = validateEmail(email);
      if (emailError) {
        setEmailError(emailError);
        return;
      }
      else {
        setEmailError('');
      }
      if (email == '' || name == '' || lastName == '' || password == '') {
        setErrorMessage("Favor de llenar todos los campos")
        return;
      }
      if (password != passwordConfirmation) {
        setErrorMessage("Las contraseñas no coinciden")
        return;
      }

      e.preventDefault();
      let userData = {
        "user": {
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirmation,
          "nombre": name,
          "apellidos": lastName
        }
      }

      fetch(`${API}users`, {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify(userData)})
      .then((response) => response.json())
      .then((result) => {
        if (result.error){
          setErrorMessage("Error en el registro, favor de revisar sus credenciales")
        }
        else {
          setErrorMessage('')
          setSuccessMessage("Usuario registrado exitosamente")
        }
      })
    }

    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <img src={terniumLogo} className="img-fluid" alt="Card Image" />
            <Card.Text className="text-muted text-center mt-2">Sistema para equipo de talento</Card.Text>
  
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </Form.Group>

            <Form.Group controlId="formBasicUser" className="mt-2">
              <Form.Control type="user" placeholder="Nombre" value={name} onChange={handleChangeName} />
            </Form.Group>

            <Form.Group controlId="formBasicUser" className="mt-2">
              <Form.Control type="user" placeholder="Apellido(s)" value={lastName} onChange={handleChangeLastName} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Control type="password" placeholder="Contraseña" value={password} onChange={handleChangePassword} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Control type="password" placeholder="Confirmar la contraseña" value={passwordConfirmation} onChange={handleChangePasswordConfirmation} />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {successMessage && <p style={{ color: 'lightgreen' }}>{successMessage}</p>}
            </Form.Group>
  
            <Button
              onClick={userRegister}
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

export default RegisterCard