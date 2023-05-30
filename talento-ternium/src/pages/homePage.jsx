import React from 'react'
import '../css/homePage.css'
import { Container } from 'react-bootstrap'
import terniumLogo from '../img/logo-ternium.png';
import listaTrabajadores from '../ejemploTrabajadores';
import ListaEmpleados from '../components/ListaEmpleados';
import SearchBar from '../components/SearchBar';
import Cookies from 'universal-cookie';
import { Link, Navigate } from 'react-router-dom';

function HomePage() {

    const cookies = new Cookies;

    if(!cookies.get('token')){
        console.log("no existe un token de autenticacion")
        return <Navigate replace to='/'></Navigate>;
    }else{
        return (
            <Container>
                <ListaEmpleados/>
            </Container>
        )
    }
}

export default HomePage;
