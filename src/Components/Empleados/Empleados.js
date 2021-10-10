import React, { useState, useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = () => {
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  // const [centerId, setCenterId] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [employeeServices, setEmployeeServices] = useState([]);
  const apiContext = useContext(context);

  const centerId = apiContext.data.data._id;

  /***** get services for each employee *****/

  const employeesIdArr = apiContext.data.data.employees;

  const {
    isLoading: servicesIsLoading,
    error: servicesError,
    data: servicesData,
    refetch: servicesRefetch,
  } = useQuery(
    ["Center Services", centerId],
    () =>
      employeesIdArr.map((x) =>
        axios.get(`/employee/${x}`).then(Promise.resolve(servicesData))
      ),
    //() => axios.get(`/center/services/${employeesIdArr}`),
    {
      enabled: true,
    }
  );

  /***** get employees for each center *****/

  const {
    isLoading: employeesIsLoading,
    error: employeesError,
    data: employeesData,
    refetch: employeesRefetch,
  } = useQuery(
    ["Center Employees", centerId],
    () => axios.get(`/center/employees/${centerId}`),
    {
      enabled: true,
      onSuccess: servicesRefetch,
    }
  );

  console.log("employeeID", employeesIdArr);

  useEffect(() => {
    if (employeesData) {
      setEmpleados(employeesData.data);
    }
  }, [employeesData]);

  //console.log("data", empleados);
  console.log("services", servicesData);

  const handleInfo = (id) => {
    const filtro = empleados.filter((empleado) => empleado.id === id);
    setEmpleadoInfo(filtro[0]);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error! {error.message}</div>;
  // }

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="empleados-list">
          <ListGroup defaultActiveKey="#link1">
            {empleados.map((i, index) => (
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
