import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../axios/axios";
import Form from "react-bootstrap/Form";
import "./Servicios.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactTooltip from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { useMutation } from "react-query";
import { context } from "../../Context/apiProvider";

const NuevoServicio = ({ titulo, servicioEdit, empleados, props }) => {
  const apiContext = useContext(context);
  let history = useHistory();

  const centerId = apiContext.data.data._id;
  const [name, setName] = useState(servicioEdit ? servicioEdit.name : "");
  const [duration, setDuration] = useState(
    servicioEdit ? servicioEdit.duration : ""
  );
  const [price, setPrice] = useState(servicioEdit ? servicioEdit.price : 0);
  const [priceType, setPriceType] = useState(
    servicioEdit ? servicioEdit.tipoPrecio : ""
  );
  const [checked, setChecked] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [hasIdleTime, setHasIdleTime] = useState(false);
  const [interval, setInterval] = useState(0);
  const [resetTime, setResetTime] = useState(0);
  const [serviceStructure1, setServiceStructure1] = useState(0);
  const [serviceStructure2, setServiceStructure2] = useState(0);
  const [serviceStructure3, setServiceStructure3] = useState(0);
  const [serviceStructure, setServiceStructure] = useState([]);
  const [description, setDescription] = useState(
    servicioEdit ? servicioEdit.description : ""
  );
  const [center, setCenter] = useState(centerId);

  const handleOnChange = (id) => {
    let selected = checked;
    let find = checked.findIndex((item) => item.id === id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(empleados.data.find((item) => item._id === id));
    }
    setEmployees(selected);
  };

  const createNewService = useMutation(
    (newService) => {
      return axios.post("/service/create", newService);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
    }
  );

  const createServiceStructure = () => {
    let serviceArr = [];
    serviceArr.push(serviceStructure1);
    serviceArr.push(serviceStructure2);
    serviceArr.push(serviceStructure3);
    setServiceStructure(serviceArr);
  };

  useEffect(() => {
    if (serviceStructure3) {
      createServiceStructure();
    }
  }, [serviceStructure3]);

  const creatServiceHandler = (e) => {
    try {
      e.preventDefault();
      const newServiceData = {
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
      createNewService.mutate(newServiceData);
    } finally {
      history.push("/");
    }
  };

  console.log("service", serviceStructure);

  return (
    <React.Fragment>
      <h4 className="titulo-servicio">{titulo}</h4>
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
            <Form.Label>
              Duración del servicio (en minutos){" "}
              <FaInfoCircle data-tip data-for="infoDuracion" />{" "}
            </Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                className="select-form"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <ReactTooltip id="infoDuracion" place="top" effect="solid">
              TEXTO A AÑADIR
            </ReactTooltip>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>
              Intervalo (en minutos):{" "}
              <FaInfoCircle data-tip data-for="infoIntervalo" />
            </Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="number"
                className="selectMins"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
              <ReactTooltip id="infoIntervalo" place="top" effect="solid">
                TEXTO A AÑADIR
              </ReactTooltip>
            </div>
          </Form.Group>
          <hr className="my-4" />

          <p>
            {" "}
            Tiempo de tratamiento de un servicio{" "}
            <FaInfoCircle data-tip data-for="infoTiempoTratamiento" />
          </p>
          {/* // IDLTE TIME */}
          <ListGroup className="d-flex justify-content-center">
            <input
              type="checkbox"
              value={false}
              checked={hasIdleTime}
              onClick={() => setHasIdleTime(!hasIdleTime)}
            />
            <ReactTooltip id="infoTiempoTratamiento" place="top" effect="solid">
              TEXTO A AÑADIR
            </ReactTooltip>
          </ListGroup>

          <hr className="my-4" />

          <Form.Group controlId="">
            {/* SERVICE STRUCTURE, AFEGIR CASELLAS SI NO SI */}
            <Form.Label>
              Estructura del servicio{" "}
              <FaInfoCircle data-tip data-for="infoEstructura" />
            </Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="number"
                className="selectMins"
                value={serviceStructure1}
                onChange={(e) => setServiceStructure1(e.target.value)}
              />
              <Form.Control
                type="number"
                className="selectMins"
                value={serviceStructure2}
                onChange={(e) => setServiceStructure2(e.target.value)}
              />
              <Form.Control
                type="number"
                className="selectMins"
                value={serviceStructure3}
                onChange={(e) => setServiceStructure3(e.target.value)}
              />
            </div>
            <ReactTooltip id="infoEstructura" place="top" effect="solid">
              TEXTO A AÑADIR
            </ReactTooltip>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>
              Tiempo de relleno{" "}
              <FaInfoCircle data-tip data-for="infoTiempoRelleno" />
            </Form.Label>
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
            <ReactTooltip id="infoTiempoRelleno" place="top" effect="solid">
              TEXTO A AÑADIR
            </ReactTooltip>
          </Form.Group>

          <hr className="my-4" />

          <Form.Group controlId="">
            <Form.Label>
              Precio y tipo de precio{" "}
              <FaInfoCircle data-tip data-for="infoPrecio" />
            </Form.Label>

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
              <span className="priceInput">
                <Form.Control
                  className="selectMins"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0€"
                />
              </span>
              <ReactTooltip id="infoPrecio" place="top" effect="solid">
                TEXTO A AÑADIR
              </ReactTooltip>
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

export default NuevoServicio;
