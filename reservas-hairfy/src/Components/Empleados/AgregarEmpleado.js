import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { Col, Form, ListGroup, Row } from 'react-bootstrap'
import './empleados.css'

const AgregarEmpleado = ({servicios}) => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [horario, setHorario] = useState('')
    const [telefono, setTelefono] = useState('')
    const [edit, setEdit] = useState(false)
    const [checked, setChecked] = useState(false)

    return (
        <div>
        <Form className='form-profile'>
            <Row className="my-4">
                <Col xs={2} className='text-center'>
                    <Form.Group controlId="" >
                    <Avatar className='avatar'/ >
                    <input type="file" id="fileElem" multiple accept="image/*" style={{display: 'none'}}/>
                    <Form.Label for="fileElem" className='my-2 edit-ph'>Editar</Form.Label>
                    </Form.Group>
                </Col>
            
                <Col>
                    <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Nombre y apellidos</Form.Label>
                        <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} />   
                     </Form.Group>
               

                    <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                     </Form.Group>
               
               
                     <Form.Group controlId="" className='mb-4'>
                        <Form.Label>Numero de teléfono</Form.Label>
                            <Form.Control type="number" value={telefono} onChange={(e)=> setTelefono(e.target.value)} />
                     </Form.Group>

                     <Form.Group controlId="" className='mb-4'>
                        <Form.Label>Horario laboral</Form.Label>
                            <Form.Control type="text" value={horario} onChange={(e)=> setHorario(e.target.value)} />
                     </Form.Group>

                     
                </Col>
                <Col>
                <Form.Label className='mx-4 mb-2'>Servicios asociados</Form.Label>
                <ListGroup>
                    {servicios ?
                    servicios.map((servicio, idx) => <ListGroup.Item className='mx-4' key={idx}><input type='checkbox' value={servicio} checked={checked} onClick={()=> setChecked(!checked)} />
                                                        <label className='mx-2'>{servicio}</label></ListGroup.Item>)
                    : 'No existen servicios disponibles'}
                </ListGroup>    
                </Col>
            </Row>
                
               
            </Form>
        </div>
    )
}

export default AgregarEmpleado
