import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { CgClose } from 'react-icons/cg'
import './Modal.css'
import { Form } from 'react-bootstrap'

const ModalReserva = ({show, submit, close}) => {


        const [empleados, setEmpleados] = useState([])
        const [servicios, setServicios] = useState([])
        const [servicioSeleccionado, setServicioSeleccionado] = useState('')
        const [nombre, setNombre] = useState('')
        const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('')
        const [horario, setHorario] = useState()
        const [fecha, setFecha] = useState()

        useEffect(()=>{
        const servicios = ['corte', 'color', 'cejas']

        const empleados = [
          {
            nombre: 'juan',
            servicio: ['cejas'],
            horario: 10-18
          },
          {
            nombre: 'francisco',
            servicio: ['cejas', 'corte', 'color'],
            horario: 10-18
          },
          {
            nombre: 'tomas',
            servicio: ['corte'],
            horario: 10-18
          },
          {
            nombre: 'nicolas',
            servicio: ['corte'],
            horario: 10-18
          },
          {
            nombre: 'jose',
            servicio: ['color'],
            horario: 10-18
          },{
            nombre: 'joaquin',
            servicio: ['color'],
            horario: 10-18
          }
        ]

        setEmpleados(empleados.map(empleado => empleado.nombre))
        setServicios(servicios)
        
      }, [])
      
      
    return (
        <div>
                <Modal show={show} 
                onHide={close}
                >
            <Modal.Header>
                <Modal.Title>Nueva reserva</Modal.Title>
                <CgClose className='closeIcon' onClick={close}/>
            </Modal.Header>
            <Modal.Body className='mx-3 mb-4'>

              <form onSubmit={submit}>

              <Form.Group controlId="" className='w-100 mb-2' >
                    <Form.Label htmlFor="title">Nombre y apellidos</Form.Label>
                    <Form.Control type="text" className='w-100 mb-3' value={nombre} id="title" onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>

                <div className='d-flex justify-content-around'>
                <Form.Group controlId="" className='w-50 mb-2 me-2' >
                    <Form.Label htmlFor="servicio">Servicio</Form.Label>
                    <Form.Control className='select-form mb-3' as="select" value={servicioSeleccionado} onChange={(e) => setServicioSeleccionado(e.target.value)}>
                           {
                            servicios.map((item, idx)=> <option value={item} key={idx}>{item}</option>)
                           }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="" className='w-50 mb-2 ms-3' >
                    <Form.Label htmlFor="empleado">Empleado</Form.Label>
                    <Form.Control className='select-form mb-3' as="select" value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)}>
                           {
                               empleados.map((item, idx)=> <option value={item} key={idx}>{item}</option>)
                           }
                    </Form.Control>
                </Form.Group>
                </div>

                <div className='d-flex justify-content-around'>
                <Form.Group controlId="" className='w-50 mb-2 me-2' >
                    <Form.Label htmlFor="fecha">Día</Form.Label>
                    <Form.Control type="date" className='w-100 mb-3' value={fecha} id='fecha' onChange={(e) => setFecha(e.target.value)} />
                </Form.Group>


                <Form.Group controlId="" className='w-50 mb-2 ms-3' >
                    <Form.Label htmlFor="empleado">Horario</Form.Label>
                    <Form.Control className='select-form mb-3' as="select" id="hora-inicio" value={horario} onChange={(e)=> setHorario(e.target.value)}>
                            <option value='10:30'>10:30</option>
                            <option value='11:00'>11:00</option>
                            <option value='11:30'>11:30</option>
                            <option value='12:00'>12:00</option>
                            <option value='12:30'>12:30</option>
                    </Form.Control>
                </Form.Group>
                </div>

                <Form.Group controlId="" className='w-50 mb-2' >
                    <Form.Label htmlFor="fecha-hasta">Hasta </Form.Label>
                    <Form.Control className='select-form mb-3' type='time' id="hora-fin" value={horario} onChange={(e)=> setHorario(e.target.value)} />
                </Form.Group>
               

              <Button type="submit" className='btn-agregar mt-2' >Crear nueva cita</Button>

              </form>
                
            </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalReserva