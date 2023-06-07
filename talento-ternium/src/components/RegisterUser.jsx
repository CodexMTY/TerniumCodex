import React from "react";
import { Button, Form, Input, InputNumber, Radio, DatePicker } from "antd";
import Cookies from "universal-cookie";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { postRequest } from "../apiUtils";

const cookies = new Cookies;

const validateMessages = {
    required: "${label} es obligatorio",
    types: {
        email: "${label} no es válido",
        number: "${label} no es válido",
    }
};

const dateFormat = "YYYY-DD-MM";

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
            "cumpleanos": values["cumpleanos"]["$d"],
            "fecha_ingreso": values["fecha_ingreso"]["$d"],
            "idm4": values["idm4"],
            "cet": values["cet"],
            "key_talent": values["key_talent"] == "true" ? true : false,
            "puesto": values["puesto"],
            "jefe": values["jefe"],
            "estructura3": values["estructura3"],
            "estructura4": values["estructura4"],
            "estructura5": values["estructura5"],
            "encuadre": values["encuadre"],
            "pc_cat": values["pccat"],
            "resumen": "",
            "universidad": "",
            "direccion": ""
        }

        const result = await postRequest("users", userData, cookies.get("token"));

        if (result.email == "has already been taken") {

            activarMensajeError(true);
            setConfirmLoading(false);
            declararMensajeError("Correo electrónico ya en uso.");

        }
        else if (result.email) {
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

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                onFinishFailed={onFinishFailed}
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

                <Form.Item label="Fecha de nacimiento"
                    name="cumpleanos"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item label="Fecha de ingreso"
                    name="fecha_ingreso"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item label="IDM4"
                    name="idm4"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <InputNumber />
                </Form.Item>

                <Form.Item label="CET"
                    name="cet"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <InputNumber />
                </Form.Item>

                <Form.Item label="Key talent"
                    name="key_talent">
                    <Radio.Group defaultValue="false">
                        <Radio value="true"> Si </Radio>
                        <Radio value="false"> No </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Puesto"
                    name="puesto"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="Jefe"
                    name="jefe"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="Estructura3"
                    name="estructura3"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="Estructura4"
                    name="estructura4"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="Estructura5"
                    name="estructura5"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="Encuadre"
                    name="encuadre"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <Input />
                </Form.Item>

                <Form.Item label="PC-CAT"
                    name="pccat"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>

                    <InputNumber />
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