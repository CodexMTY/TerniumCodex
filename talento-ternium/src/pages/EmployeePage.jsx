import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getRequest } from '../apiUtils';
import Cookies from 'universal-cookie';
import { Spinner, Button } from 'react-bootstrap';
import html2canvas from "html2canvas";
import JsPDF from 'jspdf';
import UpwardFeedback from '../components/UpwardFeedback';
import EvaluacionAnual from '../components/EvaluacionAnual';
import ClienteProveedor from '../components/ClienteProveedor';

function UserPage() {

    const cookies = new Cookies();

    if (!cookies.get('token')) {
        console.log("no existe un token de autenticacion");
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

    const fetchEmployeeData = async () => {
        try {
            const data = await getRequest(`users/${id}`);
            if(data.nombre === undefined || data.nombre === null) {
                setDataEmpty(true);
            } else {
                setEmployee(data);
                setError(false); // reset error state on successful fetch
            }
        } catch (error) {
            console.error("Failed to fetch employee data:", error);
            setError(true);
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
                        <h1>{`${employee.nombre} ${employee.apellidos}`}</h1>
                    </div>
                    <UpwardFeedback UpwardFeedbackData={{user_id: id, UpwardFeedbackData: employee.upward_fbks}}/>
                    <ClienteProveedor ClienteProveedorData={{user_id: id, ClienteProveedorData: employee.cliente_proveedors}}/>
                    <EvaluacionAnual EvaluacionAnualData={{user_id: id, EvaluacionAnualData: employee.evaluaciones_anuales}}/>
                    <Button size='lg' id='botonImprimir' onClick={generaFicha}>
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
                    <Spinner animation="border" variant='warning'>
                    </Spinner>
                    <p>Cargando...</p>
                </div>
            )}
        </div>
    );
}

export default UserPage;
