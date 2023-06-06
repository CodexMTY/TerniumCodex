import { useState } from 'react';
import { Table } from 'react-bootstrap';
import AgregarEditarPopupView from './AgregarEditarPopupView';

function EvaluacionAnual({ EvaluacionAnualData }) {
    const [anio, setAnio] = useState('');
    const [performance, setPerformance] = useState('');
    const [potencial, setPotencial] = useState('');
    const [curva, setCurva] = useState('');

    const manejoAnio = (event) => {
        setAnio(event.target.value);
    };
      
    const manejoPerformance = (event) => {
        setPerformance(event.target.value);
    };
      
    const manejoPotencial = (event) => {
        setPotencial(event.target.value);
    };
      
    const manejoCurva = (event) => {
        setCurva(event.target.value);
    };

    const inputsHabilitados = ["anio", "performance", "potencial", "curva"]
    
    return (
        <>
        <Table striped bordered hover size="sm">
            <thead>
                <tr style={{ backgroundColor: "orange" }}>
                    <th colSpan={4}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginLeft: "5px", textAlign: "left" }}>Evaluaciones Anuales</span>
                        <div style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}>
                            <AgregarEditarPopupView
                                titulo="Agregar datos de Evaluaciones Anuales"
                                anio={anio}
                                performance={performance}
                                potencial={potencial}
                                curva={curva}
                                manejoAnio={manejoAnio}
                                manejoPerformance={manejoPerformance}
                                manejoPotencial={manejoPotencial}
                                manejoCurva={manejoCurva}
                                inputsHabilitados={inputsHabilitados}
                                url="evaluaciones_anuales"
                                userID={EvaluacionAnualData.user_id}
                            />
                        </div>
                    </div>
                    </th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th style={{ backgroundColor: "#ffc966", width: "100px" }}>Año</th>
                    <th style={{ backgroundColor: "#ffc966", width: "100px" }}>Performance</th>
                    <th style={{ backgroundColor: "#ffc966", width: "175px" }}>Potencial</th>
                    <th style={{ backgroundColor: "#ffc966", width: "175px" }}>Curva</th>
                </tr>
            </thead>
            <tbody>
                {EvaluacionAnualData.EvaluacionAnualData.slice(-5).reverse().map((data) => (
                    <tr key={data.id}>
                        <td>{data.ano}</td>
                        <td>{data.performance}</td>
                        <td>{data.potencial}</td>
                        <td>{data.curva}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
  );
}

export default EvaluacionAnual;