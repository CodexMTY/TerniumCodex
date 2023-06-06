import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import terniumLogo from '../img/logo-ternium.png';

function AuthCard({ children, onSubmit, switchCard, primaryButtonText, secondaryButtonText }) {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <img src={terniumLogo} className="img-fluid" alt="Logo Ternium" />
          <Card.Text className="text-muted text-center mt-2">Sistema para equipo de talento</Card.Text>
          <Form onSubmit={onSubmit}>
            {children}

            <Button variant="outline-danger" type="submit" className="mt-3 py-2 w-75">
                {primaryButtonText}
            </Button>

            <Button variant="outline-danger" onClick={switchCard} className="mt-3 py-2 w-75">
                {secondaryButtonText}
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AuthCard;
