import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import "./empleados.css";

const AgregarEmpleado = ({ servicios, nombre, setNombre, email, setEmail, horario, setHorario, telefono, setTelefono }) => {
   
    //const [edit, setEdit] = useState(false);
    const [checked, setChecked] = useState(false);

    return (
        <div>
            <Form className="form-profile">
                <Row className="my-4">
                    <Col xs={2}>
                        <Form.Group
                            controlId=""
                            className="d-flex flex-column justify-content-center"
                        >
                            <Avatar className="avatar" />
                            <div className="mx-2 my-1">
                                <input
                                    type="file"
                                    id="fileElem"
                                    multiple
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                <Form.Label
                                    for="fileElem"
                                    className="my-2 edit-ph"
                                >
                                    Editar
                                </Form.Label>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="" className="mb-3">
                            <Form.Label>Nombre y apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="" className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="" className="mb-4">
                            <Form.Label>Numero de teléfono</Form.Label>
                            <Form.Control
                                type="number"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="" className="mb-4">
                            <Form.Label>Horario laboral</Form.Label>
                            <Form.Control
                                type="text"
                                value={horario}
                                onChange={(e) => setHorario(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label className="mx-4 mb-2">
                            Servicios asociados
                        </Form.Label>
                        <ListGroup>
                            {servicios
                                ? servicios.map((servicio, idx) => (
                                    <ListGroup.Item
                                        className="mx-4"
                                        key={idx}
                                    >
                                        <input
                                            type="checkbox"
                                            value={servicio}
                                            checked={checked}
                                            onClick={() =>
                                                setChecked(!checked)
                                            }
                                        />
                                        <label className="mx-2">
                                            {servicio}
                                        </label>
                                    </ListGroup.Item>
                                ))
                                : "No existen servicios disponibles"}
                        </ListGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AgregarEmpleado;

