import { useState, useEffect, useRef } from 'react';
import '../css/EmployeePage.css';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getRequest, putImage } from '../apiUtils';
import Cookies from 'universal-cookie';
import { Spinner, Button, Row, Col, Image } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import PersonalDataTable from '../components/PersonalDataTable';
import picturePlaceholder from '../img/profile_picture.png';
import UpwardFeedback from '../components/UpwardFeedback';
import EvaluacionAnual from '../components/EvaluacionAnual';
import ClienteProveedor from '../components/ClienteProveedor';

function UserPage() {

    const cookies = new Cookies();
    const fileInputRef = useRef();

    if (!cookies.get("token")) {
        return <Navigate replace to='/'></Navigate>;
    }

    const generaFicha = async () => {
        const pdf = new JsPDF("portrait", "pt", "a4")
        const data = await html2canvas(document.querySelector("#datosEmpleado"))
        const img = data.toDataURL("image/png")  
        const imgProperties = pdf.getImageProperties(img)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save("ficha.pdf")
    }

    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(false);
    const [isDataEmpty, setDataEmpty] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const fetchEmployeeData = async () => {
        console.log(cookies.get('token'))
        try {
            const data = await getRequest(`users/${id}`, cookies.get('token'));
            if(data.idm4 === null || data.nombre === null) {
                setDataEmpty(true);
            } else {
                setEmployee(data);
                setError(false);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleImageHover = () => {
        setHovered(true);
    };

    const handleImageLeave = () => {
        setHovered(false);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        try {
            await putImage(`users/${id}`, file, cookies.get('token'));
            await fetchEmployeeData();
        } catch (error) {
            console.error("Error while updating image:", error);
        }
    };
    
    

    useEffect(() => {
        fetchEmployeeData();
    }, [id]);

    return (
        <div>
            <Header />
            {employee ? (
                <div>
                    <div id="datosEmpleado">
                        <Row>
                        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div 
                                onMouseEnter={handleImageHover} 
                                onMouseLeave={handleImageLeave} 
                                onClick={handleImageClick} 
                                style={{ 
                                    position: "relative", 
                                    width: "150px", 
                                    height: "150px", 
                                    borderRadius: "50%", 
                                    overflow: "hidden" 
                                }}
                            >
                                <Image 
                                    roundedCircle="true" 
                                    src={employee.image ? employee.image : picturePlaceholder}  
                                    style={{ 
                                        height: "150px", 
                                        width: "150px", 
                                        objectFit: "cover" 
                                    }} 
                                />
                                {isHovered && 
                                    <div 
                                        style={{ 
                                            position: "absolute", 
                                            top: 0, 
                                            left: 0, 
                                            width: "100%", 
                                            height: "100%", 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center", 
                                            backgroundColor: "rgba(0,0,0,0.5)", 
                                            color: "white" 
                                        }}
                                    >
                                        Cambiar imagen
                                    </div>
                                }
                                <input 
                                    ref={fileInputRef} 
                                    type="file" 
                                    style={{ display: "none" }} 
                                    onChange={handleFileChange}
                                />
                            </div>
                            <h1>{`${employee.nombre} ${employee.apellidos}`}</h1>
                            <p>Correo electrónico: {`${employee.email}`}</p>
                            <p>{`${employee.resumen}`}</p>
                        </Col>

                            <Col>
                                <PersonalDataTable employeeData={employee} />
                            </Col>
                        </Row>
                        <UpwardFeedback UpwardFeedbackData={{user_id: id, UpwardFeedbackData: employee.upward_fbks}}/>
                        <ClienteProveedor ClienteProveedorData={{user_id: id, ClienteProveedorData: employee.cliente_proveedors}}/>
                        <EvaluacionAnual EvaluacionAnualData={{user_id: id, EvaluacionAnualData: employee.evaluaciones_anuales}}/>
                    </div>
                    <Button size="lg" id="botonImprimir" onClick={generaFicha}>
                        Imprimir Ficha
                    </Button>
                </div>
            ) : isDataEmpty ? (
                <p>No se encontraron los datos del empleado</p>
            ) : error ? (
                <div>
                    <p>Error al cargar los datos</p>
                    <Button onClick={fetchEmployeeData}>Recargar</Button>
                </div>
            ) : (
                <div>
                    <Spinner animation="border" variant="warning">
                    </Spinner>
                    <p>Cargando...</p>
                </div>
            )}
        </div>
    );
}

export default UserPage;
