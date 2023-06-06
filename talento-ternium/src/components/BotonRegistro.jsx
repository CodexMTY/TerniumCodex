import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import RegisterUser from './RegisterUser';
import { Nav } from 'react-bootstrap';

function BotonSubida() {
    const [mostrar, activarMostrar] = useState(false);

    const manejarCerrar = () => activarMostrar(false);
    const manejarAbrir = () => activarMostrar(true);

    return (
        <>
            <Nav.Link onClick={manejarAbrir}>
                Registrar empleado
            </Nav.Link>

            <Modal size="lg" show={mostrar} onHide={manejarCerrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro individual</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterUser />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BotonSubida;