import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthCard from "./AuthCard";
import { postRequest } from "../apiUtils";

function LoginCard({ switchCard }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function reformatDate(dateStr) {
    let parts = dateStr.split(" ");
    let dateParts = parts[0].split("-");
    let reformattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]} ${parts[1]}`;

    return reformattedDate;
  }

  const userLogin = async (e) => {
    e.preventDefault();
    const result = await postRequest("auth/login", { email, password });
    
    if (result.error){
      setErrorMessage("Credenciales incorrectas");
    }
    else if(result.token){
      let expDateStr = result.exp; // MM-DD-YYYY HH:MM
      let [month, day, yearTime] = expDateStr.split("-");
      let [year, time] = yearTime.split(" ");
      let expiryDate = `${year}-${month}-${day}T${time}:00Z`; // Convert to ISO string format

      let utcDate = new Date(expiryDate);

      Cookies.set("token", result.token, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("user_id", result.user_id, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("admin", result.admin, { expires: utcDate, path: "/", sameSite: "None", secure: true });
      Cookies.set("super_admin", result.super_admin, { expires: utcDate, path: "/", sameSite: "None", secure: true });
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
