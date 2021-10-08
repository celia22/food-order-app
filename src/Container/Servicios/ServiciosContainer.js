import React, { useContext, useEffect, useState, useRef } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";
import NuevoServicio from "../../Components/Servicios/NuevoServicio";
import "../../Components/Servicios/Servicios.css";

const ServiciosContainer = () => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;

  const firstRenderRef = useRef(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [servEdit, setServEdit] = useState({});
  const [empleados, setEmpleados] = useState([]);
  const [servicios, setServicios] = useState([]);
  console.log(centerId);

  /***** get services for each center *****/
  const getServices = async () => {
    const data = await axios.get(`/center/services/${centerId}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "getEmployees",
    getServices,
    {
      onSuccess: apiContext.refetch,
      onError: (error) => console.error(error),
    }
  );

  // console.log("data", data.data);

  useEffect(() => {
    if (data) {
      setServicios(data.data);
    }

    const emple = [
      "empleado1",
      "empleado2",
      "empleado3",
      "empleado4",
      "empleado5",
      "empleado6",
      "empleado7",
      "empleado8",
      "empleado9",
      "empleado10",
    ];
  }, [edit]);

  console.log("services", servicios);

  const deleteServicio = (id) => {
    const remove = servicios.filter((i) => i.id !== id);

    setServicios(remove);
  };

  const editServicio = (id) => {
    const filter = servicios.filter((i) => i.id === id);

    setServEdit(filter[0]);
    setEdit(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div style={{ marginLeft: "125px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="titulo-fotos">Servicios</h2>
        <button className="btn-agregar mx-5" onClick={() => setShow(!show)}>
          Agregar servicio
        </button>
      </div>

      <div className="">
        {edit ? (
          <NuevoServicio
            titulo="Editar"
            servicioEdit={servEdit}
            empleados={empleados}
          />
        ) : show ? (
          <NuevoServicio titulo="Nuevo Servicio" empleados={empleados} />
        ) : (
          <ListGroup className="listaServicios">
            {servicios.length &&
              servicios.map((servicio, idx) => (
                <ListGroupItem
                  key={idx}
                  className="itemList d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="nombreServicio">{servicio.name}</p>

                    <div>
                      Descripción: {servicio.description}
                      <br />
                      Duración: {servicio.duration}
                      <br />
                      Precio: {servicio.priceType} {servicio.price}€
                    </div>
                  </div>
                  <div className="span-icons">
                    <FaTrash
                      className="mx-4 icon"
                      onClick={() => deleteServicio(servicio.id)}
                    />
                    <FaEdit
                      className="icon"
                      onClick={() => editServicio(servicio.id)}
                    />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default ServiciosContainer;
