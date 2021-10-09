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
  const [employees, setEmployees] = useState([]);
  const [servicios, setServicios] = useState([]);
  console.log(centerId);

  /***** get services for each center *****/
  const getServices = async () => {
    const data = await axios.get(`/center/services/${centerId}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "getServices",
    getServices,
    {
      onSuccess: apiContext.refetch,
      onError: (error) => console.error(error),
    }
  );

  /***** get employees for each center *****/

  const getEmployee = async () => {
    const employeeArr = await axios.get(
      `/center/employees/${apiContext.data.data._id}`
    );
    return employeeArr;
  };

  const { data: employeeArr } = useQuery("getEmployees", getEmployee, {
    onError: (error) => console.error(error),
  });

  console.log("employee", employeeArr);

  useEffect(() => {
    if (data) {
      setServicios(data.data);
      setEmployees(employeeArr);
    }
  }, [data]);

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
            empleados={employeeArr}
          />
        ) : show ? (
          <NuevoServicio titulo="Nuevo Servicio" empleados={employeeArr} />
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
