import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import InfoEmpleados from './InfoEmpleados'

const Empleados = ({empleados}) => {

    const [empleadoInfo, setEmpleadoInfo] = useState()

    // const handleInfo = (id) => {
    //    const filtro = empleados.filter((empleado) => empleado.id === id)
    //     setEmpleadoInfo(filtro)
    //     console.log(filtro)
    //     console.log(id)
        
    // }
    console.log(empleadoInfo)
    console.log(empleados)

    return (
        <>
        <div className='d-flex justify-content-between'>
            <ListGroup defaultActiveKey="#link1">
             {
                 empleados.map( i => <ListGroup.Item key={i.id} className='py-3' action >{i.nombre}</ListGroup.Item>)
             }   
            </ListGroup>

           {/* <InfoEmpleados empleado={empleadoInfo} />  */}
        </div>
        </>
    )
}

export default Empleados
