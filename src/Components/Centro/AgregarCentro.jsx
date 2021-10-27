import axios from "../../axios/axios";
import React, { useState, useContext } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import "./Agregarcentro.css";
import { context } from "../../Context/apiProvider";
import { useMutation } from "react-query";


const dictionary = {
  "mon-mor": "lunes mañana",
  "mon-aft": "lunes tarde",
  "tue-mor": "martes mañana",
  "tue-aft": "martes tarde",
  "wed-mor": "miércoles mañana",
  "wed-aft": "miércoles tarde",
  "thu-mor": "jueves mañana",
  "thu-aft": "jueves tarde",
  "fri-mor": "viernes mañana",
  "fri-aft": "viernes tarde",
  "sat-mor": "sábado mañana",
  "sat-aft": "sábado tarde",
  "sun-mor": "domingo mañana",
  "sun-aft": "domingo tarde",
};

const AgregarCentro = () => {
  const apiContext = useContext(context);
  // const centerId = apiContext.data.data._id;


  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [address, setAddress] = useState("");
  const [cp, setCp] = useState("");
  const [loc, setLoc] = useState([]);
  const [centerPics, setCenterPics] = useState([]);
  const [city, setCity] = useState(false);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [clientsChooseEmployee, setClientsChooseEmployee] = useState("");
  const [openingHours, setOpeningHours] = useState({
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

  const createNewCenter = useMutation(
    (newCenter) => {
      return axios.post("/center/create", newCenter);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
    }
  );



  const createCenterHandler = (e) => {
  
      e.preventDefault();
      const newCenterData = {
        name,
        email,
        legalName,
        address,
        cp,
        city,
        country,
        loc,
        phone,
        clientsChooseEmployee,
        openingHours
      };
      createNewCenter.mutate(newCenterData);
    
  };

  const handleFocus = (event) => event.target.select();

  const handleHours = (event) => {
    const { name, id } = event.target;
    const value = event.target.validity.valid
      ? event.target.value
      : openingHours[name][id];
    const hoursArr =
      Number(id) === 0
        ? [Number(value), openingHours[name][1]]
        : [openingHours[name][0], Number(value)];
    setOpeningHours({ ...openingHours, [name]: hoursArr });
  };

  return (
    <div>
      <button className="btn-newform" onClick={createCenterHandler}>
        Guardar cambios
      </button>
      <Form className="form-profile">
        <Row className="my-4">
          
          <Col>
            <Form.Group controlId="" className="mb-3">
              <Form.Label>Nombre del centro</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="" className="mb-3">
              <Form.Label>Razón Social</Form.Label>
              <Form.Control
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="" className="mb-4">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="" className="mb-4">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="" className="mb-4">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
           
            <Form.Group controlId="" className="mb-4">
                <Form.Check
                  type="checkbox"
                  value={clientsChooseEmployee}
                  onChange={() =>
                    setClientsChooseEmployee(!clientsChooseEmployee)
                  }
                  label="Quieres que los clientes elijan a los empleados?"
                />
              </Form.Group>
        
                
              <label>Horario</label>

              {Object.keys(openingHours).map((element, i) => {
                return (
                  <div key={i}>
                    
                    <label>{dictionary[element]}</label>
                    <input
                      value={openingHours[element][0]}
                      name={element}
                      type="number"
                      id="0"
                      onChange={handleHours}
                      onClick={handleFocus}
                    />
                    <label>{dictionary[element]}</label>
                    <input
                      value={openingHours[element][1]}
                      name={element}
                      type="number"
                      id="1"
                      onChange={handleHours}
                      onClick={handleFocus}
                    />
                  </div>
                );
              })}
     
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AgregarCentro;