import React, { useState, useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";

const Empleados = () => {
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [employeeServices, setEmployeeServices] = useState([]);
  const apiContext = useContext(context);

  /***** get employees for each center *****/
  const getEmployee = async () => {
    const data = await axios.get(
      `/center/employees/${apiContext.data.data._id}`
    );
    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "getEmployees",
    getEmployee,
    {
      onError: (error) => console.error(error),
    }
  );

  /***** get services for each center *****/
  const getServices = async () => {
    const centerServices = await axios.get(
      `/center/services/${apiContext.data.data._id}`
    );
    return centerServices;
  };

  const { data: centerServices } = useQuery("getServices", getServices, {
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    if (data) {
      setEmpleados(data.data);
    }
  }, [data]);

  console.log("data", data);
  console.log("services", centerServices);

  const employeeService = (centerServices, data) => {
    // data.data.forEach(x => x.services.includes(centerServices.data.forEach(x => x._id)){
    //   console.log("buuuuu")
    // })
    // for (let i = 0; i < data.data.length; i++) {
    //   for (let j = 0; j < centerServices.length; j++) {
    //     if (data.data[i].services === centerServices[j]._id) {
    //       console.log("buuuuu");
    //     } else {
    //       console.log("nooooo");
    //     }
    //   }
    // }
  };

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
