import React, { useState, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = () => {
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const apiContext = useContext(context);

  /***** get employees for each center *****/
  const getEmployee = async () => {
    const data = await axios.get(
      `/center/employees/${apiContext.data.data._id}`
    );
    return data;
  };

  const { data, centerData, isLoading, isError, error } = useQuery(
    "getEmployees",
    getEmployee,
    {
      onError: (error) => console.error(error),
    }
  );
  const empleados = data;

  // const employeesIdArr = apiContext.data.data.employees;
  // console.log("api ARR", employeesIdArr);

  /***** get services for each employee *****/
  const employeesIdArr = apiContext.data.data.employees;

  const getService = async () => {
    const employeeData = employeesIdArr.map((x) => axios.get(`/employee/${x}`));
    return employeeData;
  };

  console.log("employeeID", employeesIdArr);

  const { isIdle, data: employeeData } = useQuery(
    ["get Service", employeesIdArr],
    getService,
    {
      enabled: !!employeesIdArr,
    }
  );

  console.log("employee", employeeData);

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
