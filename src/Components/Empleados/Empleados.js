import React, { useState, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = () => {
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const apiContext = useContext(context);

  const getEmployee = async () => {
    const data = await axios.get(
      `/center/employees/${apiContext.data.data._id}`
    );
    return data;
  };

  const getService = async () => {
    const employeeData = await axios.get(
      `/employee/${apiContext.data.data.employees}`
    );
    return employeeData;
  };

  const { data, isLoading, isError, error } = useQuery(
    "get employees",
    getEmployee,
    {
      onError: (error) => console.error(error),
    }
  );

  const employeeId = apiContext.data.data.employees;
  console.log(data);
  console.log("employeeID", employeeId);

  //  console.log("servcies", employeeData)

  // const serviceData = useQuery("get service", getService, {
  //   onError: (error) => console.error(error),
  // });

  const empleados = data;
  // const services = serviceData.data.services;
  // console.log("services", services);

  const handleInfo = (id) => {
    const filtro = empleados.filter((empleado) => empleado.id === id);
    setEmpleadoInfo(filtro[0]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="empleados-list">
          <ListGroup defaultActiveKey="#link1">
            <p>blo</p>
            {empleados.data.map((i, index) => (
              <ListGroup.Item
                key={index}
                className="py-3"
                onClick={() => handleInfo(i.id)}
                action
              >
                <p>
                  Nombre: {i.firstName} {i.lastName}
                </p>
                <p> Servicios: </p>
                {/* {services.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.name}</p>
                    </div>
                  );
                })}  */}
                <p> Horario: </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div>
          <InfoEmpleados empleado={empleadoInfo} />
        </div>
      </div>
    </>
  );
};

export default Empleados;
