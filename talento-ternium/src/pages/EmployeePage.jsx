import { useState, useEffect, useRef } from "react";
import "../css/EmployeePage.css";
import { Navigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getRequest, putImage } from "../apiUtils";
import Cookies from "js-cookie";
import { Spinner, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import picturePlaceholder from "../img/profile_picture.png";
import EmployeeData from "../components/EmployeeData";

function UserPage() {
  
  const fileInputRef = useRef();

  if (!Cookies.get("token")) {
    return <Navigate replace to="/"></Navigate>;
  }

  const generaFicha = async () => {
    const pdf = new JsPDF("portrait", "pt", "a4");
    const margin = 40;
    const data = await html2canvas(document.querySelector("#datosEmpleado"), { scale: 1 });
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
    pdf.save("ficha.pdf");
  };

  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(false);
  const [isDataEmpty, setDataEmpty] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [sameUser, setSameUser] = useState(false);

  const fetchEmployeeData = async () => {

    if (Cookies.get("user_id") === id){
      setSameUser(true);
      return;
    }

    else {
      try {
        const data = await getRequest(`users/${id}`, Cookies.get("token"));
        if (data.idm4 === null || data.nombre === null) {
          setDataEmpty(true);
        } else {
          setEmployee(data);
          setError(false);
        }
      } catch (error) {
        setError(true);
      }
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
      await putImage(`users/${id}`, file, Cookies.get("token"));
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
            <EmployeeData 
                employee={employee} 
                handleImageHover={handleImageHover} 
                handleImageLeave={handleImageLeave}
                handleImageClick={handleImageClick}
                handleFileChange={handleFileChange}
                fileInputRef={fileInputRef}
                isHovered={isHovered}
                picturePlaceholder={picturePlaceholder}
            />
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
      ) : sameUser ? (
        <p>No tiene acceso a este usuario</p>
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
