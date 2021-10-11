import React, { useContext, useState, useEffect } from "react";
import { context } from "../../Context/apiProvider";
import AgregarEmpleado from "../../Components/Empleados/AgregarEmpleado";
import Empleados from "../../Components/Empleados/Empleados";
import "../../Components/Empleados/empleados.css";
import { useQuery } from "react-query";

const EmpleadosContainer = (props) => {
  // const graphqlContext = useContext(context);
  const apiContext = useContext(context);
  const [empleados, setEmpleados] = useState([]);
  //const [empleadoInfo, setEmpleadoInfo] = useState({})
  const [addEmpleado, setAddEmpleado] = useState(false);
  const [servicios, setServicios] = useState([]);

  /////// COMO GUARDAR PARA ALMACENAR AL BACK ///////////

  const nuevoEmpleado = () => {};

  return (
    <div className="container-empleados">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="titulo-empleados">Empleados</h2>
        {!addEmpleado ? (
          <button
            className="btn-agregar mx-5"
            onClick={() => setAddEmpleado(true)}
          >
            Agregar nuevo empleado
          </button>
        ) : (
          " "
          // <button className="btn-edit" onClick={nuevoEmpleado}>
          //   Guardar cambios
          // </button>
        )}
      </div>

      <div className="">
        {addEmpleado ? (
          <AgregarEmpleado servicios={servicios} />
        ) : (
          <Empleados empleados={empleados} />
        )}
      </div>
    </div>
  );
};

export default EmpleadosContainer;
