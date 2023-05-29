import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CargarArchivo from './CargarArchivo';

function BotonSubida() {
  const [mostrar, activarMostrar] = useState(false);

  const manejarCerrar = () => activarMostrar(false);
  const manejarAbrir = () => activarMostrar(true);

  return (
    <>
      <Button className="mt-2 py-2 w-30" variant="outline-danger" onClick={manejarAbrir}>
        Abrir carga de archivos
      </Button>

      <Modal show={mostrar} onHide={manejarCerrar}>
        <Modal.Header closeButton>
          <Modal.Title>Carga de archivos</Modal.Title>
        </Modal.Header>
        <Modal.Body> <CargarArchivo /> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCerrar}>
            Cerrar pestaña
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BotonSubida;