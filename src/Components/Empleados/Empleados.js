import React, { useState, useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = (props) => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const [center, setCenter] = useState(centerId);
  const [employees, setEmployees] = useState([]);
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
      return newEmployee;
    });
  };

  const printServices = (servicesArr) =>
    servicesArr.map((serv) => serv.name).join(", ");

  useEffect(() => {
    if (employeesData && servicesData) {
      setEmployees(employeesData.data);
      setServices(servicesData.data);
    }
  }, [employeesData, servicesData]);

  const handleInfo = (id) => {
    const filtro = employees.filter((empleado) => empleado.id === id);
    setEmpleadoInfo(filtro[0]);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="empleados-list">
          <ListGroup defaultActiveKey="#link1">
            {getEmployeesAndServices(employees, services).map((i, index) => (
              <ListGroup.Item
                key={index}
                className="py-3"
                onClick={() => handleInfo(i.id)}
                action
              >
                <p>
                  Nombre: {i.firstName} {i.lastName}
                </p>

                <p> Servicios: {printServices(i.services)}</p>
                <p> Horario: </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div>
          <InfoEmpleados empleado={employees} props={props} />
        </div>
      </div>
    </>
  );
};

export default Empleados;
