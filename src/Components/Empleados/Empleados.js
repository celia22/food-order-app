import React, { useState, useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery, useMutation } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";
import { FaEdit, FaTrash } from "react-icons/fa";

const Empleados = (props) => {
  const apiContext = useContext(context);
  const centerId = apiContext.data.data._id;
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const [center, setCenter] = useState(centerId);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [employeeServices, setEmployeeServices] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [employeeEdit, setEmployeeEdit] = useState({});

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
        _id: emp._id,
        services,
      };
      console.log(newEmployee);
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

  /***** delete service *****/

  const deleteEmployee = useMutation(
    (id) => {
      return axios.put(`/employee/delete/${id}`);
    },
    {
      enabled: false,
      onError: (error) => console.error(error),
      onSuccess: apiContext.refetch,
    }
  );

  const deleteEmpleado = (id) => {
    const remove = employees.filter((i) => i._id !== id);
    deleteEmployee.mutate(id);
    setEmployees(remove);
  };

  /********** edit services  ***********/

  const editEmpleado = (id) => {
    const filter = employees.filter((i) => i._id === id);
    setEmployeeEdit(filter);
    setEdit(true);
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
                // onClick={() => handleInfo(i.id)}
                action
              >
                <div>
                  <p>
                    Nombre: {i.firstName} {i.lastName}
                  </p>

                  <p> Servicios: {printServices(i.services)}</p>
                  <p> Horario: </p>
                </div>
                <div className="span-icons">
                  <FaTrash
                    className="mx-4 icon"
                    data={i.id}
                    onClick={() => deleteEmpleado(i._id)}
                  />
                  <FaEdit
                    className="icon"
                    // onClick={() => editEmpleado(i._id)}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div>{/* <InfoEmpleados empleado={employees} props={props} /> */}</div>
      </div>
    </>
  );
};

export default Empleados;
