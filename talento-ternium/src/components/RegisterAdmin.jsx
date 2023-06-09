import React from "react";
import { Button, Form, Input, Switch } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { postRequest } from "../apiUtils";

const validateMessages = {
    required: "${label} es obligatorio",
    types: {
        email: "${label} no es válido",
        number: "${label} no es válido",
    }
};

const RegisterUser = () => {

    const [mensajeError, declararMensajeError] = useState("");
    const [mensajeExito, declararMensajeExito] = useState("");
    const [mostrarMensajeError, activarMensajeError] = useState(false);
    const [mostrarMensajeExito, activarMensajeExito] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [form] = Form.useForm();

    const reloadPage = () => {
        window.location.reload;
    }

    const onFinish = async (values) => {
        setConfirmLoading(true);
        let userData = {
            "nombre": values["nombre"],
            "apellidos": values["apellidos"],
            "email": values["email"],
            "password": values["password"],
            "password_confirmation": values["password_confirmation"],
            "admin": true,
            "super_admin": values["super_admin"] || false // set it to false if it's undefined
        }

        const result = await postRequest("users", userData, Cookies.get("token"));

        if (result.email == "has already been taken") {
            activarMensajeError(true);
            setConfirmLoading(false);
            declararMensajeError("Correo electrónico ya en uso.");
        } else if (result.email) {
            activarMensajeExito(true);
            setConfirmLoading(false);
            declararMensajeExito("Empleado registrado correctamente.");
            form.resetFields();
        } else {
            activarMensajeError(true);
            setConfirmLoading(false);
            declararMensajeError("Error. Inténtelo de nuevo.");
        }
    };

    return (
        <>
            <Form
                form={form}
                name="form_usuario"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellido/s"
                    name="apellidos"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="Email"
                    rules={[
                        {
                            type: "email",
                            required: true
                        }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirmar contraseña"
                    name="password_confirmation"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Favor de confirmar contraseña",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Las contraseñas no coinciden"));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="super_admin"
                    label="Super Admin"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={confirmLoading}>
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
            {activarMensajeError && mostrarMensajeError && (
                <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="danger" onClose={() => activarMensajeError(false)} dismissible>
                    {mensajeError}
                </Alert>
            )}
            {activarMensajeExito && mostrarMensajeExito && (
                <Alert style={{ marginTop: "8px", marginBottom: "0px" }} variant="success" onClose={() => activarMensajeExito(false)} dismissible>
                    {mensajeExito} <a href="/homePage" style={{ textDecoration: "underline" }} onClick={reloadPage}>Recargar página para cambios.</a>
                </Alert>
            )}
        </>
    )

}

export default RegisterUser;
