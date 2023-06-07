import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { putRequest } from "../apiUtils";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function EditPersonalData({ show, handleClose, employeeData }) { 
    const [nombre, setNombre] = useState(employeeData.nombre);
    const [apellidos, setApellidos] = useState(employeeData.apellidos);
    const [email, setEmail] = useState(employeeData.email);
    const [estructura3, setEstructura3] = useState(employeeData.estructura3);
    const [estructura4, setEstructura4] = useState(employeeData.estructura4);
    const [estructura5, setEstructura5] = useState(employeeData.estructura5);
    const [direccion, setDireccion] = useState(employeeData.direccion);
    const [puesto, setPuesto] = useState(employeeData.puesto);
    const [jefe, setJefe] = useState(employeeData.jefe);
    const [resumen, setResumen] = useState(employeeData.resumen);
    const [keyTalent, setKeyTalent] = useState(employeeData.key_talent);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, toggleError] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [success, toggleSuccess] = useState(false);
    const cookies = new Cookies();

    const updateEmployeeData = async (e) => {
        e.preventDefault();
    
        // Check if all fields have been filled
        if (!nombre || !email || !apellidos || !estructura3 || !estructura4 || !estructura5 || !direccion || !puesto || !jefe) {
            setErrorMessage("Favor de llenar todos los datos");
            toggleError(true);
            return;
        }
    
        let userData = {
        
            "nombre": nombre,
            "apellidos": apellidos,
            "email": email,
            "estructura3": estructura3,
            "estructura4": estructura4,
            "estructura5": estructura5,
            "direccion": direccion,
            "puesto": puesto,
            "jefe": jefe,
            "resumen": resumen, 
            "key_talent": keyTalent
            
        }
    
        const result = await putRequest(`users/${employeeData.id}`, userData, cookies.get("token"));
    
        if (result.error){
            setErrorMessage("Error al cambiar los datos, favor de intentar de nuevo.");
            toggleError(true);
        }
        else {
            setSuccessMessage("Los datos se han guardado exitosamente. La página se reiniciará en breve.");
            toggleSuccess(true);
    
            // Wait for 3 seconds and then reload the page
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 3000);
        }
    }
    

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Datos Personales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateEmployeeData}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Estructura 3</Form.Label>
                                <Form.Control type="text" value={estructura3} onChange={e => setEstructura3(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Estructura 4</Form.Label>
                                <Form.Control type="text" value={estructura4} onChange={e => setEstructura4(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Estructura 5</Form.Label>
                                <Form.Control type="text" value={estructura5} onChange={e => setEstructura5(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Puesto</Form.Label>
                                <Form.Control type="text" value={puesto} onChange={e => setPuesto(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                                <Form.Label>Jefe</Form.Label>
                                <Form.Control type="text" value={jefe} onChange={e => setJefe(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Resumen</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            maxLength={250}
                            value={resumen} 
                            onChange={e => setResumen(e.target.value)} 
                        />
                        <Form.Text className="text-muted">
                            {resumen.length}/250
                        </Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                                <Form.Check
                                    type="switch"
                                    label="Key Talent"
                                    checked={keyTalent}
                                    onChange={(e) => setKeyTalent(e.target.checked)}
                                />
                            </Form.Group>

                </Form>
                <Button variant="outline-danger" className="mt-2 py-2 w-30" onClick={updateEmployeeData}>Guardar cambios</Button>
                {setErrorMessage && error && (
                    <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="danger" onClose={() => toggleError(false)} dismissible>
                        {errorMessage}
                    </Alert>
                )}
                {setSuccessMessage && success && (
                    <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="success" onClose={() => toggleSuccess(false)} dismissible>
                        {successMessage}
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default EditPersonalData;
