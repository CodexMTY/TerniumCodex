import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AgregarEditarPopupView from './AgregarEditarPopupView';

function ClienteProveedor({ ClienteProveedorData }) {
    const [puntaje, setPuntaje] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [promedio, setPromedio] = useState('');

    useEffect(() => {
        if (ClienteProveedorData.ClienteProveedorData.length > 0) {
            const puntajes = ClienteProveedorData.ClienteProveedorData.slice(-5).map((data) => data.promedio);
            const sum = puntajes.reduce((acc, curr) => acc + curr);
            const average = sum / puntajes.length;
            setPromedio(average.toFixed(2));
        }
    }, [ClienteProveedorData]);

    const manejoPuntaje = (event) => {
        setPuntaje(event.target.value);
    };

    const manejoComentarios = (event) => {
        setComentarios(event.target.value);
    };

    const inputsHabilitados = ["puntaje", "comentarios"]
    
    return (
        <>
        <Table striped bordered hover size="sm">
            <thead>
                <tr style={{ backgroundColor: 'orange' }}>
                    <th colSpan={2}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginLeft: '5px', textAlign: 'left' }}>Cliente Proveedor</span>
                            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
                                <span style={{ marginRight: '10px' }}>Promedio: {promedio}</span>
                                <AgregarEditarPopupView
                                    title='Agregar datos de Cliente Proveedor'
                                    puntaje={puntaje}
                                    comentarios={comentarios}
                                    manejoPuntaje={manejoPuntaje}
                                    manejoComentarios={manejoComentarios}
                                    inputsHabilitados={inputsHabilitados}
                                    url='cliente_proveedors'
                                    user_id={ClienteProveedorData.user_id}
                                />
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th style={{ backgroundColor: '#ffc966', width: '100px' }}>Puntaje</th>
                    <th style={{ backgroundColor: '#ffc966', width: '450px' }}>Comentarios</th>
                </tr>
            </thead>
            <tbody>
                {ClienteProveedorData.ClienteProveedorData.slice(-5).map((data) => (
                    <tr key={data.id}>
                        <td>{data.promedio}</td>
                        <td>{data.comentarios}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
  );
}

export default ClienteProveedor;