import React from "react";
import { Col, Image, Badge, Row } from "react-bootstrap";
import PersonalDataTable from "../components/PersonalDataTable";
import UpwardFeedback from "../components/UpwardFeedback";
import ClienteProveedor from "../components/ClienteProveedor";
import EvaluacionAnual from "../components/EvaluacionAnual";

function EmployeeData({ employee, handleImageHover, handleImageLeave, handleImageClick, handleFileChange, fileInputRef, isHovered, picturePlaceholder }) {
  return (
    <div>
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
          {employee.key_talent && (
            <Badge bg="success">Key Talent</Badge>
          )}
          {
            !employee.key_talent && (
              <Badge bg="danger">No Key Talent</Badge>
            )}
          <p>Correo electrónico: {`${employee.email}`}</p>
          <p>{`${employee.resumen}`}</p>
        </Col>
        <Col>
          <PersonalDataTable employeeData={employee} />
        </Col>
      </Row>
      <UpwardFeedback UpwardFeedbackData={{ user_id: employee.id, UpwardFeedbackData: employee.upward_fbks }} />
      <ClienteProveedor ClienteProveedorData={{ user_id: employee.id, ClienteProveedorData: employee.cliente_proveedors }} />
      <EvaluacionAnual EvaluacionAnualData={{ user_id: employee.id, EvaluacionAnualData: employee.evaluaciones_anuales }} />
    </div>
  );
}

export default EmployeeData;
