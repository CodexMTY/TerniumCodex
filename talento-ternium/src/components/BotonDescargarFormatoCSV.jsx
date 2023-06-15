import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Nav, Button } from "react-bootstrap";

const descargarArchivo = (contenido, nombreArchivo) => {
    const element = document.createElement("a");
    const file = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
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
Nombre(evitar caracteres especiales para que no marque error),Apellido(evitar caracteres especiales para que no marque error),correodelempleado@ternium.com.mx,1,28/2/2002(dia/mes/anio),30/3/2020(dia/mes/anio),Universidad,Direccion,Puesto,1,Resumen,Escribir true o false,Encuadre,1,Estructura3,Estructura4,Estructura5,Jefe`;

    const contenidoArchivoUpwardFClienteP = `email,promedio,comentarios
correodelempleado@ternium.com.mx,Numero del 0 al 5(la base de datos utiliza promedio para el nombre de la variable pero es el puntaje),comentarios`

    const contenidoArchivoEvaluacionesAnuales = `email,ano,performance,potencial,curva
correodelempleado@ternium.com.mx,2020,Numero del 0 al 5,Potencial,Curva`

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
                className="mt-2"
                variant="outline-danger"
                style={{ width: "100%", height: "40px", fontSize: "14px" }}
                onClick={() => descargarArchivo(contenidoArchivoDatosEmpleado, "FormatoDatosEmpleados.csv")}
            > 
                Descargar formato para datos de empleados
            </Button>
            <Button
                type="submit"
                className="mt-3"
                variant="outline-danger"
                style={{ width: "100%", height: "40px", fontSize: "14px" }}
                onClick={() => descargarArchivo(contenidoArchivoUpwardFClienteP, "FormatoUpwardFeedback_ClienteProveedor.csv")}
            > 
                Descargar formato para Upward Feedback y Cliente Proveedor
            </Button>
            <Button
                type="submit"
                className="mt-3 mb-2"
                variant="outline-danger"
                style={{ width: "100%", height: "40px", fontSize: "14px" }}
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