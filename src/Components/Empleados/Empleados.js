import React, { useState, useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = () => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;

  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const [center, setCenter] = useState(centerId);
  const [empleados, setEmpleados] = useState([]);
  const [services, setServices] = useState([]);
  const [employeeServices, setEmployeeServices] = useState([]);

  /***** get services for each employee *****/

  const {
    isLoading: servicesIsLoading,
    error: servicesError,
    data: servicesData,
    refetch: servicesRefetch,
  } = useQuery(
    ["Center Services", center],
    () => axios.get(`/center/services/${center}`),
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
    ["Center Employees", center],
    () => axios.get(`/center/employees/${center}`),
    {
      enabled: true,
      onSuccess: servicesRefetch,
    }
  );

  //console.log("employees", empleados);

  const handleInfo = (id) => {
    const filtro = empleados.filter((empleado) => empleado.id === id);
    setEmpleadoInfo(filtro[0]);
  };

  let employeeWithService = [];

  const getEmployeesAndServices = (employeeArr, serviceArr) => {
    return employeeArr.map((emp) => {
      const services = serviceArr.filter((serv) =>
        emp.services.includes(serv._id)
      );

      const newEmployee = {
        firstName: emp.firstName,
        lastName: emp.lastName,
        services,
      };
      employeeWithService.push(newEmployee);
      return newEmployee;
    });
  };

  getEmployeesAndServices(empleados, services);

  useEffect(() => {
    if (employeesData && servicesData) {
      setEmpleados(employeesData.data);
      setServices(servicesData.data);
      setEmployeeServices(employeeWithService);
    }
  }, [employeesData, servicesData]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error! {error.message}</div>;
  // }
  console.log("services", employeeWithService);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="empleados-list">
          <ListGroup defaultActiveKey="#link1">
            {employeeWithService.map((i, index) => (
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
                {i.services.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.name}</p>
                    </div>
                  );
                })}
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
