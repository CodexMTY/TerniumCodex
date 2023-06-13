import { Button, Popconfirm, message } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function DeleteConfirm({ userId, escogerEmpleados, refetchEmpleados }) {
    const [abrir, setAbrir] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const showPopconfirm = () => {
        if (Cookies.get("admin") === "true" && Cookies.get("super_admin") === "false") {
            setTitulo("Desactivar registro de empleado");
            setDescripcion("¿Estás seguro/a de que quieres desactivar este registro?");
        }
        if (Cookies.get("admin") === "true" && Cookies.get("super_admin") === "true") {
            setTitulo("Borrar registro de empleado");
            setDescripcion("¿Estás seguro/a de que quieres borrar este registro?");
        }
        setAbrir(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        fetchDelete();
        if (Cookies.get("admin") === "true" && Cookies.get("super_admin") === "false") {
            message.success("Usuario desactivado", 3);
        }
        if (Cookies.get("admin") === "true" && Cookies.get("super_admin") === "true") {
            message.success("Usuario eliminado", 3);
        }
    };

    const handleCancelar = () => {
        setAbrir(false);
        message.error("Operación cancelada", 3);
    };

    const borrarEmpleado = () => {
        escogerEmpleados();
        refetchEmpleados();
    }
    
    const fetchDelete = async () => {
        try {
            const response = await fetch(`https://codextern-4ny2.onrender.com/users/${userId}`, { method: "DELETE", headers: {"Authorization": Cookies.get("token")} });
            if (response.ok) {
                borrarEmpleado()
                setAbrir(false);
                setConfirmLoading(false);
            } else {
                setAbrir(false);
                setConfirmLoading(false);
            }
        } catch (error) {
            setAbrir(false);
            setConfirmLoading(false);
        }
    };

    return (
        <Popconfirm
            titulo={titulo}
            description={descripcion}
            open={abrir}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
                danger: true,
            }}
            onCancel={handleCancelar}
            okText="Realizar operación"
            cancelText="Cancelar"
        >
            <Button type="dashed" icon={<DeleteOutlined
                style={{
                    color: "#ff0000"
                }} />}
                onClick={showPopconfirm}>
            </Button>
        </Popconfirm>
    );
}

export default DeleteConfirm;