import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";



function LogIn() {

  if (Cookies.get("token")) {
    return <Navigate replace to="/homePage"></Navigate>;
  }

  const [activeCard, setActiveCard] = useState("login");

  function switchCard() {
    setActiveCard(activeCard === "login" ? "register" : "login");
  }

  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {activeCard === "login" ? (
        <LoginCard switchCard={switchCard} />
      ) : (
        <RegisterCard switchCard={switchCard} />
      )}
    </div>
  );
}

export default LogIn;
