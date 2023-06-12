import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import RegisterUser from "./RegisterUser";
import RegisterAdmin from "./RegisterAdmin";
import { Nav } from "react-bootstrap";

function BotonSubidaEmpleados({ tipoRegistro }) {
    const [mostrar, activarMostrar] = useState(false);
    const [registroEmpleado, setRegistroEmpleado] = useState(false);
    const [registroRH, setRegistroRH] = useState(false);
    const [registroAdmin, setRegistroAdmin] = useState(false);

    useEffect(() => {
        if (tipoRegistro === "empleado") {
            setRegistroEmpleado(true);
        } else if (tipoRegistro === "rh") {
            setRegistroRH(true);
        } else if (tipoRegistro === "admin") {
            setRegistroAdmin(true);
        }
    }, [tipoRegistro]);

    const manejarCerrar = () => activarMostrar(false);
    const manejarAbrir = () => activarMostrar(true);

    return (
        <>
        {registroEmpleado ? (
            <>
                <Nav.Link onClick={manejarAbrir}>
                    Registrar empleado
                </Nav.Link>

                <Modal size="lg" show={mostrar} onHide={manejarCerrar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar empleado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterUser tipoUsuario="empleado" />
                    </Modal.Body>
                </Modal>
            </>
        ) : registroRH ? (
            <>
                <Nav.Link onClick={manejarAbrir}>
                    Registrar RH
                </Nav.Link>

                <Modal size="lg" show={mostrar} onHide={manejarCerrar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar RH</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterUser tipoUsuario="rh" />
                    </Modal.Body>
                </Modal>
            </>
        ) : registroAdmin ? (
            <>
                <Nav.Link onClick={manejarAbrir}>
                    Registrar Admin
                </Nav.Link>

                <Modal size="lg" show={mostrar} onHide={manejarCerrar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registrar Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterAdmin />
                    </Modal.Body>
                </Modal>
            </>
        ) : null }
        </>
    );
}

export default BotonSubidaEmpleados;
