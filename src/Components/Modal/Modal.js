import { useContext, useEffect, useState } from "react";
//import Calendar from "../Components/Calendar/Calendar";
import { context } from "../../Context/apiProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CgClose } from "react-icons/cg";
import "./Modal.css";
import { Form, ListGroup } from "react-bootstrap";
import { useMutation } from "react-query";
import axios from "../../axios/axios";

const ModalReserva = ({
  show,
  submit,
  close,
  data,
  dataBookings,
  dataEmployees,
  dataServices,
}) => {
  const apiContext = useContext(context);
  const [centerId, setCenterId] = useState("");
  const [empleados, setEmpleados] = useState("");
  const [servicios, setServicios] = useState("");
  const [bookings, setBookings] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [nombre, setNombre] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [unregisteredUser, setUnregisteredUser] = useState("");

  useEffect(() => {
    if (dataEmployees && dataServices && dataBookings) {
      setServicios(dataServices.data);
      setEmpleados(dataEmployees.data);
      setBookings(dataBookings);
      setCenterId(apiContext.data.data._id);
      setUnregisteredUser(apiContext.data.data.unregisteredUser);
    }
  }, [dataEmployees && dataServices && dataBookings]);

  const createNewBooking = useMutation(
    (newBooking) => {
      return axios.post("/booking/create", newBooking);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
      retry: false,
    }
  );

  const createBookingHandler = (e) => {
    const startDate = startTime.toISOString();
    e.preventDefault();
    const newBookingData = {
      center: centerId,
      user: unregisteredUser,
      bookings: [
        {
          employee: empleadoSeleccionado,
          service: servicioSeleccionado,
          minute: startDate.split(":")[1],
          hour: startDate.split("T")[1].slice(0, 2),
          day: startDate.split("-")[2].slice(0, 2),
          month: startDate.split("-")[1] - 1,
          year: startDate.split("-")[0],
        },
      ],
    };
    // console.log("newbooking", newBookingData);
    createNewBooking.mutate(newBookingData);
  };

  const handleSelectedService = (item) => {
    setServicioSeleccionado(item.item._id);

    let date = startTime;
    let d1 = startTime,
      d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + item.item.duration);

    setEndTime(d2);
  };

  const handleAvailableEmployee = () => {
    const appointmentStartTime = parseInt(
      (new Date(startTime).getTime() / 1000).toFixed(0)
    );

    const appointmentEndTime = parseInt(
      (new Date(endTime).getTime() / 1000).toFixed(0)
    );

    let filtered = empleados;

    bookings.map((item) => {
      const bookingStartTime = parseInt(
        (new Date(item.startTime).getTime() / 1000).toFixed(0)
      );
      const bookingEndTime = parseInt(
        (new Date(item.endTime).getTime() / 1000).toFixed(0)
      );
      if (
        appointmentEndTime < bookingStartTime ||
        appointmentStartTime > bookingEndTime
      ) {
        console.log("available", item.employee);
      } else {
        filtered = empleados.filter((x) => x._id !== item.employee);
      }
    });
    setAvailableEmployees(filtered);
  };

  useEffect(() => {
    if (startTime && endTime && servicioSeleccionado) {
      handleAvailableEmployee();
    }
  }, [startTime, endTime, servicioSeleccionado]);

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
                {/*  {console.log("selected", servicioSeleccionado)} */}
              </Form.Group>

              {servicioSeleccionado ? (
                <Form.Group className="w-50 mb-2 me-2">
                  <Form.Label htmlFor="servicio">Empleados</Form.Label>
                  {Object.values(availableEmployees).map((item, index) => {
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
                </Form.Group>
              ) : (
                ""
              )}
            </div>

            <Button
              type="submit"
              className="btn-agregar mt-2"
              onClick={createBookingHandler}
            >
              Crear nueva cita
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalReserva;

// const servicesByEmployee = () => {
//   const arr = [];
//   servicioSeleccionado.map((item, index) => {
//     item.employees.map((x) => {
//       console.log("x", x);
//     });
//   });
//   // for (let i = 0; i < empleados.length; i++) {
//   //   for (let j = 0; j < empleados[i].services.length; j++) {
//   //     console.log("wtf", empleados[i].services[j]);
//   //     if (empleados[i].services[j] === servicioSeleccionado) {
//   //       arr.push([empleados[i]]);
//   //     }
//   //   }
//   // }
//   // setEmpleados(arr);
// };

// useEffect(() => {
//   if (startTime && servicioSeleccionado) {
//     handleSelectedService();
//   }
// }, [startTime]);
