import React from 'react'
import '../css/homePage.css'
import { Container,Row,Col,Dropdown,DropdownButton,Form,InputGroup,Button } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import listaTrabajadores from '../ejemploTrabajadores';
import { Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';

function TablaTrabajadores(){
    return (
        <Container id='tablaTrabajadores'>
            <Row xs={6} className='encabezado'>
                <Col className='identificador'>Nombre</Col>
                <Col className='identificador'>Edad</Col>
                <Col className='identificador'>Antigüedad</Col>
                <Col className='identificador'>Area</Col>
                <Col className='identificador'>Dirección</Col>
                <Col className='identificador'>Puesto</Col>
            </Row>
            {
                listaTrabajadores.map(function(element){
                    return(
                        <Link to='/vistaEmpleado' style={{ color: 'black' }}>
                        <Row xs={6} className='elemento' id={element.id}>
                            <Col className='identificador'>{element.nombre}</Col>
                            <Col className='identificador'>{element.edad}</Col>
                            <Col className='identificador'>{element.antiguedad}</Col>
                            <Col className='identificador'>{element.area}</Col>
                            <Col className='identificador'>{element.direccion}</Col>
                            <Col className='identificador'>{element.puesto}</Col>
                        </Row>
                        </Link>
                    );
                })
            }
            {}
            
        </Container>
    );
}

function HomePage(){
    
    const cookies = new Cookies;

    if(!cookies.get('token')){
        return <Navigate replace to='/' />;
    }
    
    else{
        return(
            <div>
                <Header />
                <InputGroup id='barraBusqueda'>
                    <Form.Control placeholder='Buscar' aria-label='buscar'/>
                    <DropdownButton variant='outline-secondary' title='Filtros' align="end">
                        <Dropdown.Item href='#'>Filtro 1</Dropdown.Item>
                        <Dropdown.Item href='#'>Filtro 2</Dropdown.Item>
                        <Dropdown.Item href='#'>Filtro 3</Dropdown.Item>
                        <Dropdown.Item href='#'>Filtro 4</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
                <TablaTrabajadores />
            </div>
        );
    }
}

export default HomePage;
