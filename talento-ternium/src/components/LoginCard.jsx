import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthCard from "./AuthCard";
import { postRequest } from "../apiUtils";

function LoginCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || password === " "){
      setErrorMessage("Favor de ingresar una credenciales válidas");
      return;
    }

    const result = await postRequest("auth/login", { email, password });
    
    if (result.error){
      setErrorMessage("Credenciales incorrectas");
    }
    else if(result.token){
      let expDateStr = result.exp;
      let [month, day, yearTime] = expDateStr.split("-");
      let [year, time] = yearTime.split(" ");
      let expiryDate = `${year}-${month}-${day}T${time}:00Z`;

      let utcDate = new Date(expiryDate);

      Cookies.set("token", result.token, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("user_id", result.user_id, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("admin", result.admin, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("super_admin", result.super_admin, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      navigate("/homePage");
    }
  }

  return (
    <AuthCard onSubmit={userLogin} primaryButtonText="Iniciar sesión">
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mt-2">
        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form.Group>

    </AuthCard>
  );
}

export default LoginCard;
