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

  // const employeesIdArr = apiContext.data.data.employees;
  // console.log("api ARR", employeesIdArr);

  const getService = async () => {
    const employeesIdArr = apiContext.data.data.employees;
    const employeeData = employeesIdArr.map((x) => axios.get(`/employee/${x}`));
    return employeeData;
  };

  const { data, centerData, isLoading, isError, error } = useQuery(
    "get employees",
    getEmployee,
    {
      onError: (error) => console.error(error),
    }
  );
  const empleados = data;

  // console.log("employeeID", employeeId);

  const { employeeData } = useQuery(
    ["get Service", { empleados }],
    () => getService(),
    {
      enabled: !!empleados,
    }
  );
  console.log(employeeData);

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
