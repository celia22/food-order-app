import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalHeader from 'react-bootstrap/ModalHeader'

const ModalContainer = ({show, handleClose, handleCreateSchedule}) => {

        // const [show, setShow] = useState(false);

        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);


        const servicios = ['corte', 'color', 'cejas']

        const empleados = [
          {
            nombre: 'juan',
            servicio: 'cejas',
            horario: 10-18
          },
          {
            nombre: 'francisco',
            servicio: ['cejas', 'corte', 'color'],
            horario: 10-18
          },
          {
            nombre: 'tomas',
            servicio: 'corte',
            horario: 10-18
          },
          {
            nombre: 'nicolas',
            servicio: 'corte',
            horario: 10-18
          },
          {
            nombre: 'jose',
            servicio: 'color',
            horario: 10-18
          },{
            nombre: 'joaquin',
            servicio: 'color',
            horario: 10-18
          }
        ]

    return (
        <div>
                    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
            <label>Servicio</label>
            <select>
                {
                    servicios.map((item, idx)=> <option key={idx}>{item}</option>)
                }
            </select>
            <br/>
            <label>Empleado</label>
            <select>
                {
                    empleados.map((empleado, idx)=> <option key={idx}>{empleado.nombre}</option>)
                }
            </select>
            <br/>
            <label>Día y hora</label>
                <input type='date'/>
                <input type='time'/>
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