import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router";
import {useMutation} from "react-query";
import axios from "../../axios/axios";
import {context} from "../../Context/apiProvider";
import {Col, Form, Row} from "react-bootstrap";


const dictionary = {
	"mon-mor": "Lunes mañana",
	"mon-aft": "Lunes tarde",
	"tue-mor": "Martes mañana",
	"tue-aft": "Martes tarde",
	"wed-mor": "Miércoles mañana",
	"wed-aft": "Miércoles tarde",
	"thu-mor": "Jueves mañana",
	"thu-aft": "Jueves tarde",
	"fri-mor": "Viernes mañana",
	"fri-aft": "Viernes tarde",
	"sat-mor": "Sábado mañana",
	"sat-aft": "Sábado tarde",
	"sun-mor": "Domingo mañana",
	"sun-aft": "Domingo tarde",
};


const EditarEmpleado = ({employee2Edit, props}) => {
	const apiContext = useContext(context);
	let history = useHistory();

	const [center, setCenter] = useState("");
	const [firstName, setFirstName] = useState(employee2Edit.firstName);
	const [lastName, setLastName] = useState(employee2Edit.lastName);
	// const [email, setEmail] = useState("");
	const [workingHours, setWorkingHours] = useState({
		"mon-mor": [9, 13],
		"mon-aft": [16, 20],
		"tue-mor": [9, 13],
		"tue-aft": [16, 20],
		"wed-mor": [9, 13],
		"wed-aft": [16, 20],
		"thu-mor": [9, 13],
		"thu-aft": [16, 20],
		"fri-mor": [9, 13],
		"fri-aft": [16, 20],
		"sat-mor": [9, 13],
		"sat-aft": [16, 20],
		"sun-mor": [0, 0],
		"sun-aft": [0, 0],
	});
	const [phone, setPhone] = useState(employee2Edit.phone);
	//const [profilePic, setProfilePic] = useState("");
	//const [edit, setEdit] = useState(false);
	const [category, setCategory] = useState(employee2Edit.category);
	const [gender, setGender] = useState(employee2Edit.gender);


	useEffect(() => {
		setCenter(apiContext.data.data._id)
	}, [apiContext.data])


	const editEmployee = useMutation(
		(updateEmployee) => {
			return axios.put(`/employee/update/${employee2Edit._id}`, updateEmployee);
		},
		{
			enabled: false,
			onError: (error) => console.error(error),
			onSuccess: apiContext.refetch,
		}
	);

	const updateEmployeeHandler = (e) => {
		e.preventDefault();
		try {
			const updateEmployee = {
				firstName,
				lastName,
				workingHours,
				phone,
				category,
				gender,
				center,
			};
			editEmployee.mutate(updateEmployee);
		} finally {
			history.push("/");
		}
	};

	const handleFocus = (event) => event.target.select();

	const handleHours = (event) => {
		const {name, id} = event.target;
		const value = event.target.validity.valid
			? event.target.value
			: workingHours[name][id];
		const hoursArr =
			Number(id) === 0
				? [Number(value), workingHours[name][1]]
				: [workingHours[name][0], Number(value)];
		setWorkingHours({...workingHours, [name]: hoursArr});
	};

	return (
		<div>
			<button className="btn-edit" onClick={updateEmployeeHandler}>
				Guardar cambios
			</button>
			<Form className="form-profile">
				<Row className="my-4">
					<Col xs={2}>
						{/* <Form.Group
              controlId=""
              className="d-flex flex-column justify-content-center"
            >
              <Avatar className="avatar" /> 
              <div className="mx-2 my-1">
                <input
                  type="file"
                  id="fileElem"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <Form.Label for="fileElem" className="my-2 edit-ph">
                  Editar
                </Form.Label>
              </div>
            </Form.Group> */}
					</Col>

					<Col>
						<Form.Group controlId="" className="mb-3">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="" className="mb-3">
							<Form.Label>Apellidos</Form.Label>
							<Form.Control
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>

						{/* <Form.Group controlId="" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>  */}

						<Form.Group controlId="" className="mb-4">
							<Form.Label>Numero de teléfono</Form.Label>
							<Form.Control
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="" className="mb-4">
							<Form.Label>Categoría</Form.Label>
							<Form.Control
								type="text"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="" className="mb-4">
							<Form.Label>Género</Form.Label>
							<Form.Control
								type="text"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							/>
						</Form.Group>

						<div>
							<label className="horario_title">Horario</label>

							{Object.keys(workingHours).map((element, i) => {
								return (
									<div key={i} className="add_employee_grid">
										<div className="add_employee_subgrid_1">
											<div className="add_employee_label">
												<label>{dictionary[element]} desde: </label>
											</div>
											<input
												className="add_employee_input"
												value={workingHours[element][0]}
												name={element}
												type="number"
												id="0"
												onChange={handleHours}
												onClick={handleFocus}
											/>
										</div>
										<div className="add_employee_subgrid_2">
											<label> hasta: </label>
											<input
												className="add_employee_input"
												value={workingHours[element][1]}
												name={element}
												type="number"
												id="1"
												onChange={handleHours}
												onClick={handleFocus}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	)

}

export default EditarEmpleado;