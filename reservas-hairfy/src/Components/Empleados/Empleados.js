import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const Empleados = ({empleados}) => {
    return (
        <div>
            <ListGroup defaultActiveKey="#link1">
             {
                 empleados.map( i => <ListGroup.Item className='py-3' action >{i.nombre}</ListGroup.Item>)
             }   
                
            </ListGroup>
        </div>
    )
}

export default Empleados