import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import botonAgregar from "../img/edit_pencil.png";
import { postRequest } from "../apiUtils";
import Cookies from "js-cookie";

function AgregarEditarPopupView(
    { titulo,
    puntaje,
    comentarios,
    anio,
    performance,
    potencial,
    curva,
    manejoPuntaje,
    manejoComentarios,
    manejoAnio,
    manejoPerformance,
    manejoPotencial,
    manejoCurva,
    inputsHabilitados,
    url,
    userID } 
    ) {

        const [mostrar, setMostrar] = useState(false);
        const [activarBoton, setActivar] = useState(false); 
        const [mensajeError, setMensajeError] = useState("");
        const [mensajeExito, setMensajeExito] = useState("");
        const [mensajeInputPuntaje, setMensajeInputPuntaje] = useState("");
        const [mensajeInputAnio, setMensajeInputAnio] = useState("");
        const [mensajeInputPerformance, setMensajeInputPerformance] = useState("");
        const [mostrarMensajeError, activarMensajeError] = useState(false);
        const [mostrarMensajeExito, activarMensajeExito] = useState(false);
        const [mostrarMensajeInputPuntaje, activarMensajeInputPuntaje] = useState(false);
        const [mostrarMensajeInputAnio, activarMensajeInputAnio] = useState(false);
        const [mostrarMensajeInputPerformance, activarMensajeInputPerformance] = useState(false);

        const manejarCerrar = () => setMostrar(false);
        const manejarAbrir = () => setMostrar(true);

        useEffect(() => {
            const inputs = inputsHabilitados.map((input) => eval(input));
            setActivar(inputs.every((valor) => valor !== ""));
        }, inputsHabilitados.map((input) => eval(input)));
        
        const habilitarCampo = (nombreCampo) => {
            return !inputsHabilitados.includes(nombreCampo);
        };

        const validarInputsNumericos = () => {
            const numericRegex = /^[0-9]+$/;
            let inputInvalido = false;
            
            setMensajeInputPuntaje("");
            setMensajeInputAnio("");
            setMensajeInputPerformance("");
            activarMensajeInputPuntaje(false);
            activarMensajeInputAnio(false);
            activarMensajeInputPerformance(false);
            
            if (puntaje !== undefined && puntaje !== "") {
                if (numericRegex.test(puntaje) && parseInt(puntaje, 10) < 0 || parseInt(puntaje, 10) > 5) {
                    setMensajeInputPuntaje("El puntaje debe ser un número entre 0 y 5");
                    activarMensajeInputPuntaje(true);
                    inputInvalido = true;
                }

                if (!numericRegex.test(puntaje)) {
                    setMensajeInputPuntaje("Solo se aceptan valores numéricos para el puntaje");
                    activarMensajeInputPuntaje(true);
                    inputInvalido = true;
                }
            }
            
            if (anio !== undefined && anio !== "" && !numericRegex.test(anio)) {
                setMensajeInputAnio("Solo se aceptan valores numéricos para el año");
                activarMensajeInputAnio(true);
                inputInvalido = true;
            }
            
            if (performance !== undefined && performance !== "") {
                if (numericRegex.test(performance) && parseInt(performance, 10) < 0 || parseInt(performance, 10) > 5) {
                    setMensajeInputPerformance("El performance debe ser un número entre 0 y 5");
                    activarMensajeInputPerformance(true);
                    inputInvalido = true;
                }

                if (!numericRegex.test(performance)) {
                    setMensajeInputPerformance("Solo se aceptan valores numéricos para el performance");
                    activarMensajeInputPerformance(true);
                    inputInvalido = true;
                }
            }

            return inputInvalido;
        }

        const manejarSubidaDatos = async (e) => {
            e.preventDefault();
            setActivar(false);
            let result = null;

            if (validarInputsNumericos()) {
                setActivar(true);
                return;
            }

            if (url === "upward_fbks") {
                result = await postRequest(url, {user_id: userID, promedio: puntaje, comments: comentarios}, Cookies.get("token"))
            } else if (url === "cliente_proveedors") {
                result = await postRequest(url, {user_id: userID, promedio: puntaje, comentarios}, Cookies.get("token"));
            } else if (url === "evaluaciones_anuales") {
                result = await postRequest(url, {user_id: userID, ano: anio, performance, potencial, curva}, Cookies.get("token"));
            } else {
                return;
            }
            
            if (result.error){
                setMensajeError("Error al subir los datos, favor de intentar de nuevo.");
                setActivar(true);
                activarMensajeError(true);
            }
            else {
                setMensajeExito("Los datos se han guardado exitosamente. La página se reiniciará en breve.");
                activarMensajeExito(true);
    
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Agregar datos
            </Tooltip>
        )
  
        return (
        <>
        <OverlayTrigger overlay={renderTooltip}>
            <Button variant="outline-light" onClick={manejarAbrir} style={{ paddingRight: "5px", paddingLeft: "5px", paddingTop: "0px", paddingBottom: "2px", border: "none" }}>
                <img src={botonAgregar} alt="Agregar" style={{ width: "15px", height: "15px" }} />
            </Button>
        </OverlayTrigger>
        <Modal show={mostrar} onHide={manejarCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup size="sm" hidden={habilitarCampo("puntaje")}>
                    <InputGroup.Text id="IngresarPuntaje" style={{ width: "100px" }}>Puntaje</InputGroup.Text>
                    <Form.Control
                        aria-label="Puntaje"
                        aria-describedby="IngresarPuntaje"
                        value={puntaje}
                        onChange={manejoPuntaje}
                    />
                </InputGroup>
                {mostrarMensajeInputPuntaje && <div style={{ color: "red", fontSize: "14px" }}>{mensajeInputPuntaje}</div>}
                <InputGroup size="sm" className="mt-3"  hidden={habilitarCampo("comentarios")}>
                    <InputGroup.Text id="IngresarComentarios" style={{ width: "100px" }}>Comentarios</InputGroup.Text>
                    <Form.Control
                        aria-label="Comentarios"
                        aria-describedby="IngresarComentarios"
                        value={comentarios}
                        onChange={manejoComentarios}
                    />
                </InputGroup>
                <InputGroup size="sm"  hidden={habilitarCampo("anio")}>
                    <InputGroup.Text id="IngresarAño" style={{ width: "100px" }}>Año</InputGroup.Text>
                    <Form.Control
                        aria-label="Año"
                        aria-describedby="IngresarAño"
                        value={anio}
                        onChange={manejoAnio}
                    />
                </InputGroup>
                {mostrarMensajeInputAnio && <div style={{ color: "red", fontSize: "14px" }}>{mensajeInputAnio}</div>}
                <InputGroup size="sm" className="mt-3"  hidden={habilitarCampo("performance")}>
                    <InputGroup.Text id="IngresarPerformance" style={{ width: "100px" }}>Performance</InputGroup.Text>
                    <Form.Control
                        aria-label="Performance"
                        aria-describedby="IngresarPerformance"
                        value={performance}
                        onChange={manejoPerformance}
                    />
                </InputGroup>
                {mostrarMensajeInputPerformance && <div style={{ color: "red", fontSize: "14px" }}>{mensajeInputPerformance}</div>}
                <InputGroup size="sm" className="mt-3"  hidden={habilitarCampo("potencial")}>
                    <InputGroup.Text id="IngresarPotencial" style={{ width: "100px" }}>Potencial</InputGroup.Text>
                    <Form.Control
                        aria-label="Potencial"
                        aria-describedby="IngresarPotencial"
                        value={potencial}
                        onChange={manejoPotencial}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mt-3"  hidden={habilitarCampo("curva")}>
                    <InputGroup.Text id="IngresarCurva" style={{ width: "100px" }}>Curva</InputGroup.Text>
                    <Form.Control
                        aria-label="Curva"
                        aria-describedby="IngresarCurva"
                        value={curva}
                        onChange={manejoCurva}
                    />
                </InputGroup>
                <Button
                    type="submit"
                    className="mt-3 py-2 w-30"
                    variant="outline-danger"
                    onClick={manejarSubidaDatos}
                    disabled={!activarBoton}
                >
                    Subir los datos ingresados
                </Button>
                {mostrarMensajeError && (
                    <Alert style={{ marginTop: "16px", marginBottom: "0px" }} variant="danger" onClose={() => activarMensajeError(false)} dismissible>
                        {mensajeError}
                    </Alert>
                )}
                {mostrarMensajeExito && (
                    <Alert style={{ marginTop: "16px", marginBottom: "0px" }} variant="success" onClose={() => activarMensajeExito(false)} dismissible>
                        {mensajeExito}
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
        </>
        );
    }

export default AgregarEditarPopupView;