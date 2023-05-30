import React from 'react'
import {Col, Dropdown, DropdownButton, Form, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function SearchBar(){
    return(
        <div id='homePage'>
            <Col>
                <Link to='/'>
                    <Button
                        className="mt-3 py-2"
                        type="button"
                        variant='outline-danger'
                    >Regresar a Login</Button>
                </Link>
            </Col>
            <InputGroup id='barraBusqueda'>
                <Form.Control placeholder='Buscar' aria-label='buscar'/>
                <DropdownButton variant='outline-secondary' title='Filtros' align="end">
                    <Dropdown.Item href='#'>Filtro 1</Dropdown.Item>
                    <Dropdown.Item href='#'>Filtro 2</Dropdown.Item>
                    <Dropdown.Item href='#'>Filtro 3</Dropdown.Item>
                    <Dropdown.Item href='#'>Filtro 4</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </div>
    );
    
}

export default SearchBar;