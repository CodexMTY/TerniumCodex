import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CargarArchivo from "./CargarArchivo";
import { Nav } from "react-bootstrap";

function BotonSubida() {
  const [mostrar, activarMostrar] = useState(false);

  const manejarCerrar = () => activarMostrar(false);
  const manejarAbrir = () => activarMostrar(true);

  return (
    <>
      <Nav.Link onClick={manejarAbrir}>
        Subir datos
      </Nav.Link>

      <Modal show={mostrar} onHide={manejarCerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Carga de archivos</Modal.Title>
        </Modal.Header>
        <Modal.Body> <CargarArchivo /> </Modal.Body>
      </Modal>
    </>
  );
}

export default BotonSubida;