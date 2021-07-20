import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Servicios from '../../Components/Servicios/Servicios'

const ModalContainer = ({show, handleClose, handleCreateSchedule}) => {

        const [empleados, setEmpleados] = useState([])
        const [servicios, setServicios] = useState([])
        const [servicioSeleccionado, setServicioSeleccionado] = useState('')
        const [nombre, setNombre] = useState('')
        const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('')

        // const [show, setShow] = useState(false);

        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);

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

        setEmpleados(empleados)
        // setServicios(empleados.map(i =>  i.servicio))
        setServicios(servicios)
       
        
      }, [])
      
      //  const serv = new Set(servicios)


      // const buscoServicio = () => {
        
      //   const losServicios = empleados.map((i =>  i.servicio))
      //   const leng = losServicios.length
        
      //     for (let index = 0 ; index === leng; index++){
      //         console.log(losServicios[index])
      //         };            

      //   }
      
      
    return (
        <div>
                    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
            <label>Nombre y apellido</label>
            <br/>
            <input type='text' onChange={(e)=>setNombre(e.target.value)}/>
            <br/>
            <div className='d-flex my-3'>
                <div>
                  <label>Servicio</label>
                  <br/>
                  <select value={servicios[0]} onChange={(e) => setServicioSeleccionado(e.target.value)}>
                      {
                          servicios.map((item, idx)=> <option value={item} key={idx}>{item}</option>)
                      }
                  </select>
                  <br/>
                </div>

                <div className='mx-4'>
                <label>Empleado</label>
                <br/>
                <select value={empleados[0]} onChange={(e)=> setEmpleadoSeleccionado(e.target.value)}> 
                    {
                        empleados.map((empleado, idx)=> <option value={empleado.nombre} key={idx}>{empleado.nombre}</option>)
                    }
                </select>
                </div>
            </div>
            
            <label>Día y hora</label>
            <br/>
                <input type='date'/>
                <select></select>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCreateSchedule}>
                Guardar reserva
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalContainer