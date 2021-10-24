import { useContext, useEffect, useState } from "react";
//import Calendar from "../Components/Calendar/Calendar";
import { context } from "../../Context/apiProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CgClose } from "react-icons/cg";
import "./Modal.css";
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { ControlPointSharp } from "@material-ui/icons";

const ModalReserva = ({ show, submit, close, data }) => {
  const apiContext = useContext(context);

  const [centerId, setCenterId] = useState(apiContext.data._id);
  const [empleados, setEmpleados] = useState(data[2]?.data?.data);
  const [servicios, setServicios] = useState([]);
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [nombre, setNombre] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();

  useEffect(() => {
    if (data[0].data && data[1].data && data[2].data) {
      setServicios(data[1]?.data?.data);
    }
  }, [data[0].data, data[1].data, data[2].data]);

  // center: centerId,
  // employee,
  // service,
  // status,
  // startTime,
  // endTime,

  const handleSelectedService = (item) => {
    console.log("item", item);
    setServicioSeleccionado(item.item._id);

    // console.log("duration", item.item.duration);
    // let date = startTime;
    // let d1 = startTime,
    //   d2 = new Date(d1);
    // d2.setMinutes(d1.getMinutes() + item.item.duration);

    // setEndTime(date);
  };

  console.log("end", endTime);

  const servicesByEmployee = () => {
    const arr = [];
    for (let i = 0; i < empleados.length; i++) {
      for (let j = 0; j < empleados[i].services.length; j++) {
        if (empleados[i].services[j] === servicioSeleccionado) {
          arr.push([empleados[i]]);
        }
      }
    }
    setEmpleados(arr);
  };

  console.log("serv secl", servicioSeleccionado);
  console.log("endtime", endTime);

  useEffect(() => {
    if (startTime) {
      handleSelectedService();
    }
  }, [startTime]);

  useEffect(() => {
    if (servicioSeleccionado) {
      servicesByEmployee();
    }
  }, [servicioSeleccionado]);

  console.log("servicios", servicios);

  console.log("empleados tras servicio selec", empleados);

  return (
    <div>
      <Modal show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>Nueva reserva</Modal.Title>
          <CgClose className="closeIcon" onClick={close} />
        </Modal.Header>
        <Modal.Body className="mx-3 mb-4">
          <form onSubmit={submit}>
            <Form.Group className="w-100 mb-2">
              <Form.Label htmlFor="title">Nombre y apellidos</Form.Label>
              <Form.Control
                type="text"
                className="w-100 mb-3"
                value={nombre}
                id="title"
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-around">
              <Form.Group className="w-50 mb-2 me-2">
                <Form.Label htmlFor="fecha">Fecha y hora:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  className="w-100 mb-3"
                  value={startTime}
                  id="fecha"
                  onChange={(e) => setStartTime(new Date(e.target.value))}
                />
              </Form.Group>
            </div>

            <div className="d-flex justify-content-around">
              <Form.Group className="w-50 mb-2 me-2">
                <Form.Label htmlFor="servicio">Servicio</Form.Label>
                {Object.values(servicios).map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <input
                        type="checkbox"
                        name="addService"
                        value={item}
                        onClick={() => handleSelectedService({ item })}
                      />
                      <option value={item}>{item.name}</option>
                    </ListGroup.Item>
                  );
                })}
                {console.log("selected", servicioSeleccionado)}
              </Form.Group>

              {servicioSeleccionado ? (
                <Form.Group className="w-50 mb-2 me-2">
                  <Form.Label htmlFor="servicio">Empleados</Form.Label>
                  {Object.values(empleados).map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <input
                          type="checkbox"
                          name="addService"
                          value={item}
                          onChange={() => setEmpleadoSeleccionado(item._id)}
                        />
                        <option value={item}>
                          {item.firstName}
                          {item.lastName}
                        </option>
                      </ListGroup.Item>
                    );
                  })}
                  {console.log("selected", servicioSeleccionado)}
                </Form.Group>
              ) : (
                ""
              )}
            </div>

            <Button type="submit" className="btn-agregar mt-2">
              Crear nueva cita
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalReserva;
