import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import editPencil from '../img/edit_pencil.png';
import { useState } from 'react';
import EditPersonalData from './EditPersonalData';

function PersonalDataTable({ employeeData }) {

    const [showEditModal, setShowEditModal] = useState(false);

    const getYearsDiff = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const yearsDiff = now.getFullYear() - date.getFullYear();
        return yearsDiff;
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Editar datos
        </Tooltip>
    )

    const handleEditClick = () => {
        setShowEditModal(true);
    }

    const handleCloseModal = () => {
        setShowEditModal(false);
    }

    return (
        <>
            <EditPersonalData show={showEditModal} handleClose={handleCloseModal} employeeData={employeeData}/>
            <Table striped bordered size="sm">
                <thead>
                <tr style={{ backgroundColor: 'orange' }}>
                        <th colSpan="2" >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ textAlign: 'center', width: '100%' }}>Datos personales</span>
                                <OverlayTrigger overlay={renderTooltip}>
                                    <Button variant="outline-light" onClick={handleEditClick} style={{ paddingRight: '5px', paddingLeft: '5px', paddingTop: '0px', paddingBottom: '2px', border: 'none' }}>
                                        <img src={editPencil} alt="Edit" style={{ width: '15px', height: '15px' }} />
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </th>
                    </tr>   
                </thead>
                <tbody>
                    <tr>
                        <td>Edad</td>
                        <td>{getYearsDiff(employeeData.cumpleanos)}</td>
                    </tr>
                    <tr>
                        <td>Antigüedad</td>
                        <td>{getYearsDiff(employeeData.fecha_ingreso)}</td>
                    </tr>
                    <tr>
                        <td>Estudios</td>
                        <td>{employeeData.estudios.length > 0 ? employeeData.estudios.join(', ') : 'Ninguno'}</td>
                    </tr>
                    <tr>
                        <td>Universidad</td>
                        <td>{employeeData.universidad}</td>
                    </tr>
                    <tr>
                        <td>Estructura3</td>
                        <td>{employeeData.estructura3}</td>
                    </tr>
                    <tr>
                        <td>Estructura4</td>
                        <td>{employeeData.estructura4}</td>
                    </tr>
                    <tr>
                        <td>Estructura5</td>
                        <td>{employeeData.estructura5}</td>
                    </tr>
                    <tr>
                        <td>Direccion</td>
                        <td>{employeeData.direccion}</td>
                    </tr>
                    <tr>
                        <td>Puesto</td>
                        <td>{employeeData.puesto}</td>
                    </tr>
                    <tr>
                        <td>PC_CAT</td>
                        <td>{employeeData.pc_cat}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default PersonalDataTable;
