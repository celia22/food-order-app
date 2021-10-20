import React, { useContext, useEffect, useState, useRef } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";
import NuevoServicio from "../../Components/Servicios/NuevoServicio";
import EditServicio from "../../Components/Servicios/EditServicio";
import "../../Components/Servicios/Servicios.css";

const ServiciosContainer = (props) => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;

  const firstRenderRef = useRef(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [servEdit, setServEdit] = useState({});
  const [employees, setEmployees] = useState([]);
  const [servicios, setServicios] = useState([]);

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

  useEffect(() => {
    if (data) {
      setServicios(data.data);
      setEmployees(employeeArr);
    }
  }, [data]);

  /***** delete service *****/

  const deleteService = useMutation(
    (id) => {
      return axios.put(`/service/delete/${id}`);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
    }
  );

  const deleteServicio = (id) => {
    const remove = servicios.filter((i) => i._id !== id);
    deleteService.mutate(id);
    setServicios(remove);
  };

  /********** edit services  ***********/

  const editServicio = (id) => {
    const filter = servicios.filter((i) => i._id === id);
    setServEdit(filter);
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
        {!show && !edit ? (
          <button className="btn-agregar mx-5" onClick={() => setShow(!show)}>
            Agregar servicio
          </button>
        ) : (
          " "
        )}
      </div>

      <div className="">
        {edit ? (
          <EditServicio
            titulo="Editar"
            servicioEdit={servEdit}
            empleados={employeeArr}
            props={props}
          />
        ) : show ? (
          <NuevoServicio
            titulo="Nuevo Servicio"
            empleados={employeeArr}
            props={props}
          />
        ) : (
          <ListGroup className="listaServicios">
            {servicios.length &&
              servicios.map((item, index) => (
                <ListGroupItem
                  key={index}
                  className="itemList d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="nombreServicio">{item.name}</p>

                    <div>
                      Descripción: {item.description}
                      <br />
                      Duración: {item.duration} minutos
                      <br />
                      Precio: {item.priceType} {item.price}€
                    </div>
                  </div>
                  <div className="span-icons">
                    <FaTrash
                      className="mx-4 icon"
                      data={item.id}
                      onClick={() => deleteServicio(item._id)}
                    />
                    <FaEdit
                      className="icon"
                      onClick={() => editServicio(item._id)}
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
