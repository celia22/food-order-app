import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalSchedule = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const servicios = ['corte', 'color', 'cejas' , 'bla']

    return (
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
        <label>Empleado</label>
        <select>
            {
                servicios.map((item, idx)=> <option key={idx}>{item}</option>)
            }
        </select>
        <label>Día y hora</label>
            <input type='date'/>
            <input type='time'/>
        </form>
        
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Guardar reserva
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalSchedule
