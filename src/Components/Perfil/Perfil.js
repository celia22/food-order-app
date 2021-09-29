import React, { useState, useContext } from "react";
import { context } from "../../Context/GraphqlProvider";
import { Avatar } from "@material-ui/core";
import { Col, Form, Row } from "react-bootstrap";
import "./perfil.css";
import { createCenter } from "../../Graphql/mutations";
import { useMutation } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase";

const PerfilContainer = () => {

	const graphqlContext = useContext(context);
	const [user] = useAuthState(auth);

	const [nombre, setNombre] = useState("Nombre");
	const [horario, setHorario] = useState("Horario");
	const [telefono, setTelefono] = useState("+34 xxxxxxxxx");
	const [direccion, setDireccion] = useState("Direccion");
	const [ciudad, setCiudad] = useState("Ciudad");
	const [codPostal, setCodPostal] = useState("CP");
	const [checked, setChecked] = useState(false);
	const [edit, setEdit] = useState(false);

	const [createProfile, { data, loading, error }] = useMutation(createCenter)

	
	//***** FX PARA CREAR PERFIL *****//
	const crearPerfil = () => {

		createProfile({
			variables: { input: { 
						"name": nombre,
						"address": direccion,
						// FALTA VER TEMA DE LA FOTO SUBIDA
						"city": ciudad,
						"phoneNumber": telefono,
						"email": user.email
						} },
		})
		setEdit(false);
	 };

	return (
		<>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
					<h2 className="titulo-empleados">Información del centro</h2>

					{!edit ? (
						<button
							className="btn-edit"
							onClick={() => setEdit(true)}
						>
							Editar
						</button>
					) : (
						<button className="btn-edit" onClick={crearPerfil}>
							Guardar cambios
						</button>
					)}
				</div>
				<Form className="form-profile">
					<Row className="my-4">
						<Col xs={2}>
							<Form.Group
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
									<Form.Label
										for="fileElem"
										className="my-2 edit-ph"
									>
										Editar
									</Form.Label>
								</div>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId="" className="mb-3">
								<Form.Label>Nombre del centro</Form.Label>
								{!edit ? (
									<p>{nombre}</p>
								) : (
									<Form.Control
										type="text"
										value={nombre}
										onChange={(e) =>
											setNombre(e.target.value)
										}
									/>
								)}
							</Form.Group>

							<Form.Group controlId="" className="mb-3">
								<Form.Label>Telefono del centro</Form.Label>
								{!edit ? (
									<p>{telefono}</p>
								) : (
									<Form.Control
										type="tel"
										pattern='^\+\d{11}$'
										title="Recuerda poner el código de area, y los 9 dígitos de tu teléfono" 
										required
										value={telefono}
										onChange={(e) =>
											setTelefono(e.target.value)
										}
									/>
								)}
							</Form.Group>

							<Form.Group controlId="" className="mb-4">
								<Form.Label>Horario del centro</Form.Label>
								{!edit ? (
									<p>{horario}</p>
								) : (
									<Form.Control
										type="text"
										value={horario}
										onChange={(e) =>
											setHorario(e.target.value)
										}
									/>
								)}
							</Form.Group>

							<Form.Group controlId="">
								<Form.Check
									type="checkbox"
									value={checked}
									onChange={(e) => setChecked(!checked)}
									label="Quieres que los clientes elijan a los empleados?"
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group controlId="" className="mb-3">
								<Form.Label>Dirección del centro</Form.Label>
								{!edit ? (
									<p>{direccion}</p>
								) : (
									<Form.Control
										type="text"
										value={direccion}
										onChange={(e) =>
											setDireccion(e.target.value)
										}
									/>
								)}
							</Form.Group>

							<Form.Group controlId="" className="mb-3">
								<Form.Label>Ciudad</Form.Label>
								{!edit ? (
									<p>{ciudad}</p>
								) : (
									<Form.Control
										type="text"
										value={ciudad}
										onChange={(e) =>
											setCiudad(e.target.value)
										}
									/>
								)}
							</Form.Group>

							<Form.Group controlId="">
								<Form.Label>Código postal</Form.Label>
								{!edit ? (
									<p>{codPostal}</p>
								) : (
									<Form.Control
										type="number"
										value={codPostal}
										onChange={(e) =>
											setCodPostal(e.target.value)
										}
									/>
								)}
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	);
};

export default PerfilContainer;
