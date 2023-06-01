import { useState, useEffect } from 'react';
import { Modal, Nav, Button, Form, InputGroup, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import botonAgregar from '../img/edit_pencil.png';
import { postRequest } from '../apiUtils';

function AgregarEditarPopupView(
    { title,
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
    user_id } 
    ) {
        const [mostrar, activarMostrar] = useState(false);
        const [datosCompletos, setDatosCompletos] = useState(false);
        const [mensajeError, setMensajeError] = useState('');
        const [mensajeExito, setMensajeExito] = useState('');
        const [mostrarMensajeError, activarMensajeError] = useState(false);
        const [mostrarMensajeExito, activarMensajeExito] = useState(false);

        const manejarCerrar = () => activarMostrar(false);
        const manejarAbrir = () => activarMostrar(true);

        useEffect(() => {
            const inputs = inputsHabilitados.map((input) => eval(input));
            setDatosCompletos(inputs.every((valor) => valor !== ''));
        }, inputsHabilitados.map((input) => eval(input)));
        
        const habilitarCampo = (nombreCampo) => {
            return !inputsHabilitados.includes(nombreCampo);
        };

        const manejarSubidaDatos = async (e) => {
            e.preventDefault();
            let result = null;

            if (url === 'upward_fbks') {
                result = await postRequest(url, {user_id, promedio: puntaje, comments: comentarios})
            } else if (url === 'cliente_proveedors') {
                result = await postRequest(url, {user_id, promedio: puntaje, comentarios});
            } else if (url === 'evaluaciones_anuales') {
                result = await postRequest(url, {user_id, ano: anio, performance, potencial, curva});
            }
            
            if (result.error){
                setMensajeError('Error al subir los datos, favor de intentar de nuevo.');
                activarMensajeError(true);
            }
            else {
                setMensajeExito('Los datos se han guardado exitosamente. La pagina se reiniciara en breve.');
                activarMensajeExito(true);
    
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Agregar datos
            </Tooltip>)
  
        return (
        <>
        <OverlayTrigger overlay={renderTooltip}>
            <Nav.Link
                style={{ paddingRight: '5px', paddingLeft: '5px', paddingTop: '0px', paddingBottom: '2px', border: '1px solid #f8f9fa', backgroundColor: 'white', color: '#f8f9fa', borderRadius: '4px' }} 
                onClick={manejarAbrir}>
                    <img src={botonAgregar} alt="AgregarDatos" style={{ width: '15px', height: '15px' }} />
            </Nav.Link>
        </OverlayTrigger>
        <Modal show={mostrar} onHide={manejarCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup size="sm" className="mb-3" hidden={habilitarCampo("puntaje")}>
                <InputGroup.Text id="IngresarPuntaje" style={{ width: '100px' }}>Puntaje</InputGroup.Text>
                <Form.Control
                    aria-label="Puntaje"
                    aria-describedby="IngresarPuntaje"
                    value={puntaje}
                    onChange={manejoPuntaje}
                />
                </InputGroup>
                <InputGroup size="sm" className="mb-3"  hidden={habilitarCampo("comentarios")}>
                    <InputGroup.Text id="IngresarComentarios" style={{ width: '100px' }}>Comentarios</InputGroup.Text>
                    <Form.Control
                        aria-label="Comentarios"
                        aria-describedby="IngresarComentarios"
                        value={comentarios}
                        onChange={manejoComentarios}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3"  hidden={habilitarCampo("anio")}>
                    <InputGroup.Text id="IngresarAño" style={{ width: '100px' }}>Año</InputGroup.Text>
                    <Form.Control
                        aria-label="Año"
                        aria-describedby="IngresarAño"
                        value={anio}
                        onChange={manejoAnio}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3"  hidden={habilitarCampo("performance")}>
                    <InputGroup.Text id="IngresarPerformance" style={{ width: '100px' }}>Performance</InputGroup.Text>
                    <Form.Control
                        aria-label="Performance"
                        aria-describedby="IngresarPerformance"
                        value={performance}
                        onChange={manejoPerformance}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3"  hidden={habilitarCampo("potencial")}>
                    <InputGroup.Text id="IngresarPotencial" style={{ width: '100px' }}>Potencial</InputGroup.Text>
                    <Form.Control
                        aria-label="Potencial"
                        aria-describedby="IngresarPotencial"
                        value={potencial}
                        onChange={manejoPotencial}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-3"  hidden={habilitarCampo("curva")}>
                    <InputGroup.Text id="IngresarCurva" style={{ width: '100px' }}>Curva</InputGroup.Text>
                    <Form.Control
                        aria-label="Curva"
                        aria-describedby="IngresarCurva"
                        value={curva}
                        onChange={manejoCurva}
                    />
                </InputGroup>
                <Button
                    type="submit"
                    className=" py-2 w-30"
                    variant="outline-danger"
                    onClick={manejarSubidaDatos}
                    disabled={!datosCompletos}
                >
                    Subir los datos ingresados
                </Button>
                {activarMensajeError && mostrarMensajeError && (
                    <Alert style={{ marginTop: "16px", marginBottom: "0px" }} variant="danger" onClose={() => activarMensajeError(false)} dismissible>
                        {mensajeError}
                    </Alert>
                )}
                {activarMensajeExito && mostrarMensajeExito && (
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