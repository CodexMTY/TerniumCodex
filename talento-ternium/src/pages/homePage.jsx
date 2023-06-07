import React from "react"
import "../css/homePage.css"
import { Container } from "react-bootstrap"
import ListaEmpleados from "../components/ListaEmpleados";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import Header from "../components/Header"

function HomePage() {

    const cookies = new Cookies;


    if(!cookies.get("token")){
        return <Navigate replace to="/"></Navigate>;
    } else {
        return (
            <>
                <Header />
                <ListaEmpleados />
            </>
        )
    }
}


export default HomePage;