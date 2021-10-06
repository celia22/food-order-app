import React, { useState, useContext, useEffect, useRef } from "react";
import { context } from "../../Context/apiProvider";
import { Avatar } from "@material-ui/core";
import { Col, Form, Row } from "react-bootstrap";
import useAuthContext from "../../Context/UserAuthContext";
import { useMutation } from "react-query";
import axios from "../../axios/axios";
import ApiProvider from "../../Context/apiProvider";
import "./perfil.css";

const PerfilContainer = () => {
  const apiContext = useContext(context);
  const firstRenderRef = useRef(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHours, setOpeningHours] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [clientsChooseEmployee, setClientsChooseEmployee] = useState(false);
  const [cp, setCp] = useState("");

  useEffect(() => {
    if (firstRenderRef.current) {
      setName(apiContext.data?.data?.name);
      setPhone(apiContext.data?.data?.phone);
      //setOpeningHours(apiContext.data.data.openingHours);
      setAddress(apiContext.data?.data?.address);
      setCity(apiContext.data?.data?.city);
      setClientsChooseEmployee(apiContext.data?.data?.clientsChooseEmployee);
      setCp(apiContext.data?.data?.cp);
    } else {
      firstRenderRef.current = true;
    }
  }, [edit]);

  console.log(apiContext.data.data);

  /**
   * Toggles the boolean value of the "edit" state, which in turn, controls whether or not we show the edit form modal
   */
  const editPerfilHandler = () => {
    setEdit(!edit);
  };

  // async function updateDataCenter() {
  //   await axios.put(`/update/${apiContext.data.data._id}`);
  // }

  const updateDataCenter = useMutation((updateData) =>
    axios.put(`/center/update/${apiContext.data.data._id}`, updateData)
  );

  /**
   * Sends new data to the API to modify the center profile info and triggers a refetch of the apiContext fetch
   */
  const UpdateCenterProfileHandler = () => {
    // const newProfileData = {
    //   name,
    //   phone,
    //   //openingHours,
    //   address,
    //   city,
    //   clientsChooseEmployee,
    //   cp,
    // };
    // console.log(newProfileData);
    //useMutation creo
    updateDataCenter.mutate({
      name,
      phone,
      //openingHours,
      address,
      city,
      clientsChooseEmployee,
      cp,
    });
    apiContext.refetch();
    editPerfilHandler();
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="titulo-empleados">Información del centro</h2>

          {!edit ? (
            <button className="btn-edit" onClick={editPerfilHandler}>
              Editar
            </button>
          ) : (
            <button className="btn-edit" onClick={UpdateCenterProfileHandler}>
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
                  <p>
                    {apiContext.isLoading ? "..." : apiContext.data?.data?.name}
                  </p>
                ) : (
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-3">
                <Form.Label>Telefono del centro</Form.Label>
                {!edit ? (
                  <p>
                    {apiContext.isLoading
                      ? "..."
                      : apiContext.data?.data?.phone}
                  </p>
                ) : (
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-4">
                <Form.Label>Horario del centro</Form.Label>
                {!edit ? (
                  <p>{"???"}</p>
                ) : (
                  <Form.Control
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="">
                <Form.Check
                  type="checkbox"
                  value={clientsChooseEmployee}
                  onChange={() =>
                    setClientsChooseEmployee(!clientsChooseEmployee)
                  }
                  label="Quieres que los clientes elijan a los empleados?"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="" className="mb-3">
                <Form.Label>Dirección del centro</Form.Label>
                {!edit ? (
                  <p>
                    {apiContext.isLoading
                      ? "..."
                      : apiContext.data?.data?.address}
                  </p>
                ) : (
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="" className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                {!edit ? (
                  <p>
                    {apiContext.isLoading ? "..." : apiContext.data?.data?.city}
                  </p>
                ) : (
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Código postal</Form.Label>
                {!edit ? (
                  <p>
                    {apiContext.isLoading ? "..." : apiContext.data?.data?.cp}
                  </p>
                ) : (
                  <Form.Control
                    type="text"
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
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
