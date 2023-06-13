import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Nav, Button } from "react-bootstrap";

const descargarArchivo = (contenido, nombreArchivo) => {
    const element = document.createElement("a");
    const file = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = nombreArchivo;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function BotonDescargarFormatoCSV() {
    const [mostrar, activarMostrar] = useState(false);
  
    const manejarCerrar = () => activarMostrar(false);
    const manejarAbrir = () => activarMostrar(true);

    const contenidoArchivoDatosEmpleado = `nombre,apellidos,email,idm4,cumpleanos,fecha_ingreso,universidad,direccion,puesto,pc_cat,resumen,key_talent,encuadre,cet,estructura3,estructura4,estructura5,jefe
Nombre,Apellido,correodelempleado@ternium.com.mx,1,28/2/2002,30/3/2020,Universidad,Direccion,Puesto,1,Resumen,True/False,Encuadre,1,Estructura3,Estructura4,Estructura5,Jefe`;

    const contenidoArchivoEvaluacionesAnuales = `email,ano,performance,potencial,curva
correodelempleado@ternium.com.mx,2020,5,Potencial,Curva`

    return (
      <>
        <Nav.Link onClick={manejarAbrir}>
          Formatos CSV
        </Nav.Link>
  
        <Modal show={mostrar} onHide={manejarCerrar}>
          <Modal.Header closeButton>
            <Modal.Title>Descarga de formatos CSV</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <Button
                type="submit"
                className="mt-2 py-2 w-30"
                variant="outline-danger"
                style={{ width: "100%" }}
                onClick={() => descargarArchivo(contenidoArchivoDatosEmpleado, "FormatoDatosEmpleados.csv")}
            > 
                Descargar formato para datos de empleados
            </Button>
            <Button
                type="submit"
                className="mt-3 mb-2 py-2 w-30"
                variant="outline-danger"
                style={{ width: "100%" }}
                onClick={() => descargarArchivo(contenidoArchivoEvaluacionesAnuales, "FormatoEvaluacionesAnuales.csv")}
            >
                Descargar formato para Evaluaciones Anuales
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default BotonDescargarFormatoCSV;