import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CargarArchivo from "./CargarArchivo";
import { Nav, Form } from "react-bootstrap";

function BatchUpload() {
    const [mostrar, activarMostrar] = useState(false);
    const [url, setUrl] = useState("");
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
    const [labelText, setLabelText] = useState("");

    const manejarCerrar = () => activarMostrar(false);
    const manejarAbrir = () => activarMostrar(true);

    useEffect(() => {
        if (opcionSeleccionada === "DatosEmpleados") {
            setUrl("users/batch_upload");
            setLabelText("Tipo de archivo a subir: Datos de empleados");
        } else if (opcionSeleccionada === "UpwardFeedback") {
            setUrl("upward_fbks/batch_upload");
            setLabelText("Tipo de archivo a subir: Upward Feedback");
        } else if (opcionSeleccionada === "ClienteProveedor") {
            setUrl("cliente_proveedors/batch_upload");
            setLabelText("Tipo de archivo a subir: Cliente Proveedor");
        } else if (opcionSeleccionada === "EvaluacionesAnuales") {
            setUrl("evaluaciones_anuales/batch_upload");
            setLabelText("Tipo de archivo a subir: Evaluaciones Anuales");
        } else {
            setUrl("");
            setLabelText("");
        }
    }, [opcionSeleccionada]);

    const handleDropdownChange = (event) => {
        setOpcionSeleccionada(event.target.value);
    };

    return (
        <>
            <Nav.Link onClick={manejarAbrir}>
                Subir archivos CSV
            </Nav.Link>

            <Modal show={mostrar} onHide={manejarCerrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Carga masiva de datos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ paddingLeft: "5px", marginTop: "-5px", marginBottom: "5px"}}>
                        <strong>{labelText}</strong>
                    </div>   
                    <Form>
                        <Form.Select
                            className="mb-2"
                            style={{ width: "100%", fontSize: "14px" }}
                            value={opcionSeleccionada}
                            onChange={handleDropdownChange}
                        >
                        <option style={{ display: "none" }} disabled value="">Seleccione el tipo de archivo</option>
                        <option value="">Deseleccionar</option>
                        <option value="DatosEmpleados">Datos de empleados</option>
                        <option value="UpwardFeedback">Upward Feedback</option>
                        <option value="ClienteProveedor">Cliente Proveedor</option>
                        <option value="EvaluacionesAnuales">Evaluaciones Anuales</option>
                        </Form.Select>
                    </Form>
                    <CargarArchivo url={url}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BatchUpload;