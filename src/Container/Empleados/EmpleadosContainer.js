import React, {useState} from "react";
import AgregarEmpleado from "../../Components/Empleados/AgregarEmpleado";
import Empleados from "../../Components/Empleados/Empleados";
import "../../Components/Empleados/empleados.css";

const EmpleadosContainer = (props) => {
	const [empleados, setEmpleados] = useState([]);
	const [addEmpleado, setAddEmpleado] = useState(false);
	const [servicios, setServicios] = useState([]);

	/////// COMO GUARDAR PARA ALMACENAR AL BACK ///////////

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
					<AgregarEmpleado servicios={servicios} props={props}/>
				) : (
					<Empleados empleado={empleados} props={props}/>
				)}
			</div>
		</div>
	);
};

export default EmpleadosContainer;
