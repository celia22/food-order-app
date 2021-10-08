import { Avatar } from "@material-ui/core";
import axios from "../../axios/axios";
import React, { useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import "./empleados.css";

const AgregarEmpleado = ({ servicios }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [workingHours, setWorkingHours] = useState({
    "mon-mor": [9, 13],
    "mon-aft": [16, 20],
    "tue-mor": [9, 13],
    "tue-aft": [16, 20],
    "wed-mor": [9, 13],
    "wed-aft": [16, 20],
    "thue-mor": [9, 13],
    "thue-aft": [16, 20],
    "fri-mor": [9, 13],
    "fri-aft": [16, 20],
    "sat-mor": [9, 13],
    "sat-aft": [16, 20],
    "sun-mor": [0, 0],
    "sun-aft": [0, 0],
  });
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");
  //const [edit, setEdit] = useState(false);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [checked, setChecked] = useState(false);

  const createNewEmployee = async () => {
    await axios.post("/employee/create", {
      firstName,
      lastName,
      workingHours,
      phone,
      category,
    });
  };

  const handleFocus = (event) => event.target.select();
  const handleHours = (event) => {
    const { name } = event.target;
    const value = event.target.validity.valid
      ? event.target.value
      : workingHours[name];
    setWorkingHours({ ...workingHours, [name]: value });
  };

  return (
    <div>
      <button className="btn-edit" type="submit" onClick={createNewEmployee}>
        Guardar cambios
      </button>
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
                <Form.Label for="fileElem" className="my-2 edit-ph">
                  Editar
                </Form.Label>
              </div>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="" className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group controlId="" className="mb-4">
              <Form.Label>Numero de teléfono</Form.Label>
              <Form.Control
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="" className="mb-4">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <div>
              <label>Horario</label>
              <input
                value={workingHours["fri-mor"][0]}
                name="fri-mor"
                type="number"
                onChange={handleHours}
                onClick={handleFocus}
              />
            </div>
          </Col>
          <Col>
            <Form.Label className="mx-4 mb-2">Servicios asociados</Form.Label>
            <ListGroup>
              {servicios
                ? servicios.map((servicio, idx) => (
                    <ListGroup.Item className="mx-4" key={idx}>
                      <input
                        type="checkbox"
                        value={servicio}
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                      />
                      <label className="mx-2">{servicio}</label>
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
