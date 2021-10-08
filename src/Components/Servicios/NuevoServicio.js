import React, { useState, useContext } from "react";
import axios from "../../axios/axios";
import Form from "react-bootstrap/Form";
import "./Servicios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useMutation } from "react-query";
import { context } from "../../Context/apiProvider";

const NuevoServicio = ({ titulo, servicioEdit, empleados }) => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;

  const [name, setName] = useState(servicioEdit ? servicioEdit.servicio : "");
  const [mins, setMins] = useState(servicioEdit ? servicioEdit.duracion : "");
  const [hrs, setHrs] = useState("");
  const [price, setPrice] = useState(servicioEdit ? servicioEdit.precio : 0);
  const [priceType, setPriceType] = useState(
    servicioEdit ? servicioEdit.tipoPrecio : ""
  );
  const [checked, setChecked] = useState(false);
  const [hasIdleTime, setHasIdleTime] = useState(false);
  const [intervalHrs, setIntervalHrs] = useState(0);
  const [intervalMins, setIntervalMins] = useState(0);
  const [resetTime, setResetTime] = useState(0);
  const [serviceStructure, setServiceStructure] = useState([]);
  const [description, setDescription] = useState(
    servicioEdit ? servicioEdit.description : ""
  );
  const [center, setCenter] = useState(centerId);

  const createNewService = useMutation((newData) => {
    return (
      axios.post("/service/create", newData),
      { onError: (error) => console.error(error) }
    );
  });

  // name,
  // description,
  // center,
  // employees,
  // priceType,
  // price,
  // duration,
  // interval,
  // resetTime,
  // hasIdleTime,
  // serviceStructure,

  const creatServiceHandler = () => {
    const newServiceData = {
      name,
      description,
      center,
      // employees, ¿??¿¿?¿??¿
      price,
      priceType,
      mins,
      hrs,
      checked,
      hasIdleTime,
      intervalHrs,
      intervalMins,
      resetTime,
      serviceStructure,
    };
    createNewService.mutate(newServiceData).then(createNewService());
  };

  return (
    <React.Fragment>
      <h4 className="titulo-servicio">{titulo}</h4>
      <div className="d-flex mt-3">
        <Form className="form-services">
          <Form.Group controlId="">
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="¿Cuál es el nombre de su servicio?"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Duración del servicio</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                className="select-form"
                as="select"
                value={hrs}
                onChange={(e) => setHrs(e.target.value)}
              >
                <option value="0">0 hrs</option>
                <option value="1">1 hrs</option>
                <option value="2">2 hrs</option>
              </Form.Control>
            </div>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>Intervalo</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                className="select-form"
                as="select"
                value={intervalHrs}
                onChange={(e) => setIntervalHrs(e.target.value)}
              >
                <option value="0">0 hrs</option>
                <option value="1">1 hrs</option>
                <option value="2">2 hrs</option>
              </Form.Control>

              <Form.Control
                as="select"
                className="selectMins"
                value={intervalMins}
                onChange={(e) => setIntervalMins(e.target.value)}
              >
                <option value="0">0 mins</option>
                <option value="15">15 mins</option>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
              </Form.Control>
            </div>
          </Form.Group>
          <hr className="my-4" />

          <p> Tiempo de tratamiento de un servicio ?¿? </p>
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
            {/* SERVICE STRUCTURE, AFEGIR CASELLAS SI NO SI */}
            <Form.Label>Tiempo después del servicio</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="text"
                className="selectMins"
                value={serviceStructure}
                onChange={(e) => setIntervalMins(setServiceStructure)}
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
                type="number"
                value={price}
                onChange={(e) => setPriceType(e.target.value)}
                placeholder="0€"
              />
            </div>
          </Form.Group>

          <button className="btn-agregar mt-3" onClick={creatServiceHandler}>
            Guardar
          </button>
        </Form>
        <div className="div-medio"></div>
        <div>
          <Form.Group controlId="">
            <Form.Label>Descripción del servicio</Form.Label>
            <Form.Control
              className=""
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
              ? empleados.map((empleado, idx) => (
                  <ListGroup.Item key={idx}>
                    <input
                      type="checkbox"
                      value={empleado}
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                    <label className="mx-2">{empleado}</label>
                  </ListGroup.Item>
                ))
              : "No existen empleados asociados"}
          </ListGroup>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NuevoServicio;
