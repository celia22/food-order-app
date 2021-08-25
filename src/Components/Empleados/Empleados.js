import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InfoEmpleados from "./InfoEmpleados";

const Empleados = ({ empleados }) => {
    const [empleadoInfo, setEmpleadoInfo] = useState("");

    const handleInfo = (id) => {
        const filtro = empleados.filter((empleado) => empleado.id === id);
        setEmpleadoInfo(filtro[0]);
    };

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
