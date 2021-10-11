import React, { useState, useContext, useEffect } from "react";
import axios from "../../axios/axios";
import Form from "react-bootstrap/Form";
import "./Servicios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useMutation, useQueryClient } from "react-query";
import { context } from "../../Context/apiProvider";

const EditServicio = ({ servicioEdit, empleados, props }) => {
  console.log(servicioEdit);
  const apiContext = useContext(context);
 
  const [name, setName] = useState(servicioEdit[0].name);
  const [duration, setDuration] = useState(servicioEdit[0].duration);
  const [price, setPrice] = useState(servicioEdit[0].price);
  const [priceType, setPriceType] = useState(servicioEdit[0].priceType);
  const [checked, setChecked] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [hasIdleTime, setHasIdleTime] = useState(servicioEdit[0].hasIdleTime);
  const [interval, setInterval] = useState(servicioEdit[0].interval);
  const [resetTime, setResetTime] = useState(servicioEdit[0].resetTime);
  const [serviceStructure, setServiceStructure] = useState([]);
  const [description, setDescription] = useState(servicioEdit[0].description);
  const [center, setCenter] = useState(servicioEdit[0].center);

  const handleOnChange = (id) => {
    let selected = checked;
    let find = checked.findIndex((item) => item._id === id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(empleados.data.find((item) => item._id === id));
    }
    setEmployees(selected);
  };


  const editService = useMutation(
    ( updateService) => {
      return axios.put(`/service/update/${servicioEdit[0]._id}`, updateService);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
    }
  );

  const updateServiceHandler = (e) => {
    // try {
    e.preventDefault();
    const updateService = {
      name,
      description,
      center,
      employees,
      priceType,
      price,
      duration,
      interval,
      resetTime,
      hasIdleTime,
      serviceStructure,
    };
  editService.mutate(updateService);
  //  } finally {
  //     props.history.push("/");
  //   }
  };
  return (
    <React.Fragment>

        <h4 className="titulo-servicio">Editar Servicio</h4>

  
      <div className="d-flex mt-3">
        <Form className="form-services">
          <Form.Group controlId="">
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control
              className="select-form"
              type="text"
              value={name}
              placeholder="¿Cuál es el nombre de su servicio?"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Duración del servicio (en minutos) </Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                className="select-form"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></Form.Control>
            </div>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Intervalo (en minutos):</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="number"
                className="selectMins"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              ></Form.Control>
            </div>
          </Form.Group>
          <hr className="my-4" />

          <p> Tiempo de tratamiento de un servicio </p>
          {/* // IDLTE TIME */}
          <ListGroup className="d-flex justify-content-center">
            <input
              type="checkbox"
              value={false}
              checked={hasIdleTime}
              onClick={() => setHasIdleTime(!hasIdleTime)}
            />
          </ListGroup>

          <hr className="my-4" />

          <Form.Group controlId="">
            {" "}
          
            {/* SERVICE STRUCTURE, AFEGIR CASELLAS SI NO SI */}
            <Form.Label>Tiempo después del servicio</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="number"
                className="selectMins"
                value={serviceStructure}
                onChange={(e) => setServiceStructure(e.target.value)}
              ></Form.Control>
            </div>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Tiempo de relleno</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                as="select"
                className="selectMins"
                value={resetTime}
                onChange={(e) => setResetTime(e.target.value)} // RESET MINS PARA EL BACK
              >
                <option value="0 ">5 mins</option>
                <option value="15 ">10 mins</option>
                <option value="30 ">15 mins</option>
                <option value="45">20 mins</option>
              </Form.Control>
            </div>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Precio y tipo de precio</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                as="select"
                className="select-form"
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
              >
                <option value="fijo">Fijo</option>
                <option value="no mostrar">No mostrar</option>
                <option value="gratis">Gratis</option>
                <option value="empieza en">Precio empieza en...</option>
              </Form.Control>

              <Form.Control
                className="selectMins"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0€"
              />
            </div>
          </Form.Group>

          <button className="btn-agregar mt-3" onClick={updateServiceHandler}>
            Guardar Cambios
          </button>
        </Form>
        <div className="div-medio"></div>
        <div>
          <Form.Group controlId="">
            <Form.Label>Descripción del servicio</Form.Label>
            <Form.Control
              className="select-form"
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <hr className="my-4" />

          <p>¿A qué empleado quieres asociar este servicio? </p>
          <ListGroup className="lista-empleados">
            {empleados
              ? Object.values(empleados.data).map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <input
                        type="checkbox"
                        name="addEmployee"
                        value={item}
                        onChange={() => handleOnChange(item._id)}
                      />
                      <label className="mx-2">
                        {item.firstName} {item.lastName}
                      </label>
                    </ListGroup.Item>
                  );
                })
              : "No existen empleados asociados"}
          </ListGroup>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditServicio;
