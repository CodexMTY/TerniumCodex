import React from "react"
import "../css/homePage.css"
import ListaEmpleados from "../components/ListaEmpleados";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "../components/Header"

function HomePage() {

    if(!Cookies.get("token")){
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