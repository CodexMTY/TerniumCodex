import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Button, Alert } from "react-bootstrap";
import Cookies from "js-cookie";
const { Dragger } = Upload;
const API = "https://codextern-4ny2.onrender.com/";

const CargarArchivo = () => {
  const [listaArchivos, declararListaArchivos] = useState([]);
  const [hayArchivo, activarBoton] = useState(false);
  const [cursorEnCaja, cambiarBorde] = useState(false);
  const [mensajeError, declararMensajeError] = useState("");
  const [mensajeExito, declararMensajeExito] = useState("");
  const [mostrarMensajeError, activarMensajeError] = useState(false);
  const [mostrarMensajeExito, activarMensajeExito] = useState(false);
  

  const props = {
    name: "file",
    multiple: false,
    accept: ".csv",
    fileList: listaArchivos,
    onChange(info) {
        const {name, type } = info.file;
        const extensionesPermitidas= ["text/csv", "application/vnd.ms-excel"];

        if(type === undefined){
            return false;
        } else if (!extensionesPermitidas.includes(type)) {
            declararMensajeError(`El archivo "${name}" no es de tipo .csv`);
            activarMensajeError(true);
            return false;
        }

        declararListaArchivos([info.file]);
        activarBoton(true);
    },
    onDrop(e) {
        const archivosArrastrados = e.dataTransfer.files;
        const extensionesPermitidas = ["csv"];

        if (archivosArrastrados.length !== 1) {
            declararMensajeError("Solo puede subir un archivo a la vez");
            activarMensajeError(true);
            return false;
        }
        
        const archivo = archivosArrastrados[0];
        const extensionArchivo = archivo.name.split(".").pop();
    
        if (!extensionesPermitidas.includes(extensionArchivo)) {
            declararMensajeError(`El archivo "${archivo.name}" no es de tipo .csv`);
            activarMensajeError(true);
            return false;
        }

        return false;
    },
    beforeUpload: () => false,
    onRemove: () => {
        declararListaArchivos([]); // Limpiar la lista
        activarBoton(false); // Desactivar el boton de subida
    },
    onMouseEnter: () => {
        cambiarBorde(true);
    },
    onMouseLeave: () => {
        cambiarBorde(false);
    },
    locale: {
        removeFile: "Eliminar archivo",
    },
  };

  const subirArchivo = () => {  
    const form = new FormData();
    form.append("file", listaArchivos[0], listaArchivos[0].name);

    fetch(`${API}users/batch_upload`, {
    method: "POST",
    body: form,
    headers: {
        "Authorization": Cookies.get("token")
    }
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.error){
            activarMensajeError(true);
            declararMensajeError("Hubo un error al intentar subir el archivo");

        }
        else {
            activarMensajeExito(true);
            declararMensajeExito("El archivo se ha subido con éxito");
        }
    })
  };

  return (
    <div>
        <Dragger style={{ borderColor: cursorEnCaja ? "#e56773" : "inherit" }} {...props}>
            <p className="ant-upload-drag-icon"> <InboxOutlined style={{ color: "#e56773" }}/> </p>
            <p className="ant-upload-text">Arrastra un archivo o haz click aquí para cargarlo</p>
            <p className="ant-upload-hint">Solo se aceptan archivos .csv</p>
        </Dragger>
        <Button
            type="submit"
            className="mt-2 py-2 w-30"
            variant="outline-danger"
            onClick={subirArchivo}
            disabled={!hayArchivo}
        >
            Subir archivo
        </Button>
        {activarMensajeError && mostrarMensajeError && (
            <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="danger" onClose={() => activarMensajeError(false)} dismissible>
                {mensajeError}
            </Alert>
        )}
        {activarMensajeExito && mostrarMensajeExito && (
            <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="success" onClose={() => activarMensajeExito(false)} dismissible>
                {mensajeExito}
            </Alert>
        )}
    </div>
  );
};

export default CargarArchivo;