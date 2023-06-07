import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AuthCard from "./AuthCard";
import { postRequest } from "../apiUtils";
import { parseISO } from "date-fns";

function LoginCard({ switchCard }) {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();
    const result = await postRequest("auth/login", { email, password });
    
    if (result.error){
      setErrorMessage("Credenciales incorrectas");
    }
    else if(result.token){
      let expDateStr = result.exp;
      let expiryDate = expDateStr.split(" ")[0].split("-").reverse().join("-") + "T" + expDateStr.split(" ")[1] + "Z";
      let utcDate = parseISO(expiryDate);
      cookies.set("token", result.token, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      cookies.set("user_id", result.user_id, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      navigate("/homePage");
    }
  }

  return (
    <AuthCard onSubmit={userLogin} switchCard={switchCard} primaryButtonText="Iniciar sesión" secondaryButtonText="Registrarse">
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-2">
        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form.Group>

      <div className="mt-2">
        <Link to="/passwordReset">Olvidé mi contraseña</Link>
      </div>
    </AuthCard>
  );
}

export default LoginCard;
