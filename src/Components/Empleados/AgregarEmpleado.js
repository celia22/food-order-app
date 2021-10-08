import { Avatar } from "@material-ui/core";
import axios from "../../axios/axios";
import React, { useState, useContext } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import "./empleados.css";
import { context } from "../../Context/apiProvider";

const AgregarEmpleado = ({ servicios }) => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;

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
    "thu-mor": [9, 13],
    "thu-aft": [16, 20],
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
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [checked, setChecked] = useState(false);
  const [center, setCenter] = useState(centerId);

  const createNewEmployee = async () => {
    await axios.post("/employee/create", {
      firstName,
      lastName,
      workingHours,
      phone,
      category,
      gender,
      center,
    });
  };

  const handleFocus = (event) => event.target.select();

  const handleHours = (event) => {
    const { name, id } = event.target;
    const value = event.target.validity.valid
      ? event.target.value
      : workingHours[name][id];
    const hoursArr =
      Number(id) === 0
        ? [Number(value), workingHours[name][1]]
        : [workingHours[name][0], Number(value)];
    setWorkingHours({ ...workingHours, [name]: hoursArr });
  };

  return (
    <div>
      <button className="btn-edit" onClick={createNewEmployee}>
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

            <Form.Group controlId="" className="mb-4">
              <Form.Label>Género</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>

            <div>
              <label>Horario</label>

              {Object.keys(workingHours).map((element, i) => {
                return (
                  <div key={i}>
                    <label>Hora inicial:</label>
                    <input
                      value={workingHours[element][0]}
                      name={element}
                      type="number"
                      id="0"
                      onChange={handleHours}
                      onClick={handleFocus}
                    />
                    <label>Hora final:</label>
                    <input
                      value={workingHours[element][1]}
                      name={element}
                      type="number"
                      id="1"
                      onChange={handleHours}
                      onClick={handleFocus}
                    />
                  </div>
                );
              })}
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
