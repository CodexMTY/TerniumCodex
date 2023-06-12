import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CargarArchivo from "./CargarArchivo";
import { Nav } from "react-bootstrap";

function BotonSubidaEmpleados() {
  const [mostrar, activarMostrar] = useState(false);

  const manejarCerrar = () => activarMostrar(false);
  const manejarAbrir = () => activarMostrar(true);

  return (
    <>
        <Nav.Link onClick={manejarAbrir}>
            Subir datos de evaluaciones anuales
        </Nav.Link>

        <Modal show={mostrar} onHide={manejarCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Carga de Evaluaciones Anuales</Modal.Title>
            </Modal.Header>
            <Modal.Body> <CargarArchivo url="evaluaciones_anuales/batch_upload"/> </Modal.Body>
        </Modal>
    </>
  );
}

export default BotonSubidaEmpleados;