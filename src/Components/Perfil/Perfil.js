import React, { useState, useContext } from "react";
import { context } from "../../Context/apiProvider";
import { Avatar } from "@material-ui/core";
import { Col, Form, Row } from "react-bootstrap";
import useAuthContext from "../../Context/UserAuthContext";
import { useQuery } from "react-query";
import axios from "axios";
import "./perfil.css";

const getPerfil = async (props) => {
  const userEmail = props.user.email;
  const { data } = await axios.get(`http://localhost:5000/login/:${userEmail}`);

  console.log("data", data);
  return data;
};

const PerfilContainer = (props) => {
  const graphqlContext = useContext(context);
  console.log("context", graphqlContext);
  console.log("PROPS", props);

  const [nombre, setNombre] = useState(" ");
  const [horario, setHorario] = useState(" ");
  const [telefono, setTelefono] = useState(" ");
  const [direccion, setDireccion] = useState(" ");
  const [ciudad, setCiudad] = useState(" ");
  const [codPostal, setCodPostal] = useState(" ");
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);

  const editPerfil = () => {
    setEdit(false);
  };

  const { data, error, isError, isLoading } = useQuery("create", getPerfil);

  console.log("data from api", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="titulo-empleados">Información del centro</h2>

          {!edit ? (
            <button className="btn-edit" onClick={() => setEdit(true)}>
              Editar
            </button>
          ) : (
            <button className="btn-edit" onClick={editPerfil}>
              Guardar cambios
            </button>
          )}
        </div>
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
                <Form.Label>Nombre del centro</Form.Label>
                {!edit ? (
                  <p>{data.name}</p>
                ) : (
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-3">
                <Form.Label>Telefono del centro</Form.Label>
                {!edit ? (
                  <p>{telefono}</p>
                ) : (
                  <Form.Control
                    type="number"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-4">
                <Form.Label>Horario del centro</Form.Label>
                {!edit ? (
                  <p>{horario}</p>
                ) : (
                  <Form.Control
                    type="text"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="">
                <Form.Check
                  type="checkbox"
                  value={checked}
                  onChange={(e) => setChecked(!checked)}
                  label="Quieres que los clientes elijan a los empleados?"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="" className="mb-3">
                <Form.Label>Dirección del centro</Form.Label>
                {!edit ? (
                  <p>{direccion}</p>
                ) : (
                  <Form.Control
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                {!edit ? (
                  <p>{ciudad}</p>
                ) : (
                  <Form.Control
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Código postal</Form.Label>
                {!edit ? (
                  <p>{codPostal}</p>
                ) : (
                  <Form.Control
                    type="number"
                    value={codPostal}
                    onChange={(e) => setCodPostal(e.target.value)}
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default PerfilContainer;
