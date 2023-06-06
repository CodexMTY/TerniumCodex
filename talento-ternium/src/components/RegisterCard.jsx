import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import AuthCard from './AuthCard';
import { postRequest } from '../apiUtils';

function RegisterCard({ switchCard }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      setEmailError("Correo electrónico inválido");
      return false;
    }
    setEmailError('');
    return true;
  }

  const register = async (e) => {
    e.preventDefault();
    const isValid = validateEmail(email);
    if (!isValid) return;

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    let userData = {
      "email": email,
      "password": password,
      "password_confirmation": passwordConfirmation,
      "nombre": name,
      "apellidos": lastName
    }

    const result = await postRequest("users", userData);

    if (result.email == "has already been taken"){
      setErrorMessage("El correo ya esta registrado");
    }
    else if (result.email) {
      setErrorMessage('');
      setSuccessMessage("Usuario creado con éxito");
    }
    else {
      setErrorMessage('Error, favor de intentar de nuevo')
    }
  }

  return (
    <AuthCard onSubmit={register} switchCard={switchCard} primaryButtonText="Registrarse" secondaryButtonText="Regresar">
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-2">
        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPasswordConfirmation" className="mt-2">
        <Form.Control type="password" placeholder="Confirmar contraseña" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName" className="mt-2">
        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicLastName" className="mt-2">
        <Form.Control type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Form.Group>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </AuthCard>
  );
}

export default RegisterCard;
