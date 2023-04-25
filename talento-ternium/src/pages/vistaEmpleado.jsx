import React from 'react'
import { Table,Container,Row,Col,Button } from 'react-bootstrap'
import terniumLogo from '../img/logo-ternium.png';
import '../css/vistaEmpleado.css'
import { Link } from 'react-router-dom';

function FichaEmpleado(){
    return(
        <div id='datosEmpleado'>
            <h1 id='nombre'>Nombre completo</h1>
            <Container fluid>
                <Row xs={1} md={2}>
                    <Col>
                        <div id='datosPersonales'>
                            <div className='titulo'>DATOS PERSONALES</div>
                            <Table bordered size='sm'>
                                <tbody>
                                    <tr>
                                        <th>Edad</th>
                                        <th>44</th>
                                    </tr>
                                    <tr>
                                        <th>Antigüedad</th>
                                        <th>3</th>
                                    </tr>
                                    <tr>
                                        <th>Estudios</th>
                                        <th>0</th>
                                    </tr>
                                    <tr>
                                        <th>Universidad</th>
                                        <th>0</th>
                                    </tr>
                                    <tr>
                                        <th>Area Manager</th>
                                        <th>Pesqueria 2</th>
                                    </tr>
                                    <tr>
                                        <th>Dirección</th>
                                        <th>Automación y Control Tx</th>
                                    </tr>
                                    <tr>
                                        <th>PC - CAT</th>
                                        <th>51 - 51</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col>
                        <div id='evaluacionesAnuales'>
                            <div className='titulo'>EVALUACIONES ANUALES</div>
                            <Table bordered size='sm'>
                                <thead>
                                    <tr>
                                        <th>AÑO</th>
                                        <th>PERF</th>
                                        <th>POTENCIAL</th>
                                        <th>CURVA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>2022</th>
                                        <th>4</th>
                                        <th>AP (MT)</th>
                                        <th>TX DIMA C1</th>
                                    </tr>
                                    <tr>
                                        <th>2021</th>
                                        <th>5</th>
                                        <th>PROM (M)</th>
                                        <th>TX DIMA C1</th>
                                    </tr>
                                    <tr>
                                        <th>2020</th>
                                        <th>4</th>
                                        <th>PROM (M)</th>
                                        <th>TX DIMA C1</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
            
            <div id='upwardFeedback'>
                <div className='titulo'>UPWARD FEEDBACK: 0 Opiniones  Promedio: NA</div>
            </div>
            <div id='clienteProveedor'>
                <div className='titulo'>CLIENTE PROVEEDOR: 4 Opiniones  Promedio: 4,50</div>
                <Table bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Nota</th>
                            <th>Comentarios</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>5</th>
                            <th>Conocimientos y vocacion de servicio</th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <th>Excelente elemento, con alto sentido de orientación al servicio, y alto conocimiento técnico</th>
                        </tr>
                        <tr>
                            <th>4</th>
                            <th>Su aporte técnico y liderazgo ha sido clave para varios hitos del proyecto</th>
                        </tr>
                        <tr>
                            <th>5</th>
                            <th>Cuando se presentan problemas viene con soluciones. Muy efectivo en su trabajo y mucho compromiso. Debe mejorar el control de estrés ante la presión</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div id='trayectoriaLaboral'>
                <div className='titulo'>TRAYECTORIA LABORAL</div>
                <Table bordered size='sm'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Empresa</th>
                            <th>Puesto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div id='resumenPerfil'>
                <div className='titulo'>RESUMEN PERFIL</div>
                <div id='resumen'>
                    Asume el liderazgo dentro del equipo de trabajo, basado en su experiencia
                    tecnica y capacidad de enfocar el proyecto como un todo y no solo dentro de 
                    su area de especialidad.
                </div>
                <div id='resumen'>
                    Comunicacion e influencia con sus pares y proveedores
                </div>
            </div>
        </div>
    );
    
};

function VistaEmpleado(){
    return(
        <div id='vistaEmpleado'>
            <Container fluid id='parteSuperior'>
                <Row xs={2}>
                    <Col>
                        <Link to='/homePage'>
                            <Button
                                className="mt-3 py-2"
                                type="button"
                                variant='outline-danger'
                            >Regresar</Button>
                        </Link>
                    </Col>
                    <Col><img src={terniumLogo} alt='Logo de Ternium' id='logo'/></Col>
                </Row>
            </Container>
            <FichaEmpleado />
            <Button size='lg' id='botonImprimir'>
                Imprimir Ficha
            </Button>
        </div>
    );
};

export default VistaEmpleado;