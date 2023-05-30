import { Button, Popconfirm } from 'antd';
import { useState, useContext } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function DeleteConfirm({ userId, chooseEmpleados, listaEmpleados }) {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        fetchDelete();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const deleteEmpleado = () => {
        listaEmpleados = listaEmpleados.filter((empleado) => empleado.id != userId);
        chooseEmpleados(listaEmpleados);
    }
    
    const fetchDelete = async () => {
        try {
            const response = await fetch(`https://codextern-4ny2.onrender.com/users/${userId}`, { method: 'DELETE' });
            if (response.ok) {
                deleteEmpleado()
                setOpen(false);
                setConfirmLoading(false);
            } else {
                setOpen(false);
                setConfirmLoading(false);
            }
        } catch (error) {
            setOpen(false);
            setConfirmLoading(false);
        }
    };

    return (
        <Popconfirm
            title="Borrar registro de empleado"
            description="¿Estás seguro/a de que quieres borrar este registro?"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
                danger: true,
            }}
            onCancel={handleCancel}
            okText="Borrar"
            cancelText="Cancelar"
        >
            <Button type="dashed" icon={<DeleteOutlined
                style={{
                    color: '#ff0000'
                }} />}
                onClick={showPopconfirm}>

            </Button>
        </Popconfirm>
    );
}

export default DeleteConfirm;