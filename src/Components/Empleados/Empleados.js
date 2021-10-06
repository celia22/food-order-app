import React, { useState, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";
import { useQuery } from "react-query";
import axios from "axios";
import { context } from "../../Context/apiProvider";

const Empleados = ({ empleados }) => {
  const [empleadoInfo, setEmpleadoInfo] = useState("");
  const apiContext = useContext(context);

  const handleInfo = (id) => {
    const filtro = empleados.filter((empleado) => empleado.id === id);
    setEmpleadoInfo(filtro[0]);
  };

  const getEmployee = async () => {
    const { data } = await axios.get(
      `/center/employees/${apiContext.data.data._id}`
    );
    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    "get employees",
    getEmployee
  );

  console.log(data);

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
            {empleados.map((i) => (
              <ListGroup.Item
                key={i.id}
                className="py-3"
                onClick={() => handleInfo(i.id)}
                action
              >
                {i.nombre}
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
