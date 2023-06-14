import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";



function LogIn() {

  if (Cookies.get("token")) {
    return <Navigate replace to="/homePage"></Navigate>;
  }

  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <LoginCard />
    </div>
  );
}

export default LogIn;
