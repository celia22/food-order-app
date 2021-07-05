import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import './Servicios.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'


const Servicios = () => {

    const [empleados, setEmpleados] = useState([])
    const [servicio, setServicio] = useState('')
    const [duracion, setDuracion] = useState('')
    const [precio, setPrecio] = useState(0)
    const [checked, setChecked] = useState(false)

    useEffect(() => { 
       
        const emple = [ 'empleado1', 'empleado2', 'empleado3', 'empleado4']
        setEmpleados(emple)
    
    }, [])

    const handleService = (event) => {
        setServicio({servicio: event.target.value})
        console.log(servicio)
    }

    return (
        <React.Fragment>
                <h2 className='titulo-servicio'>Nuevo Servicio</h2>
                <div className='d-flex justify-content-around mt-3'>
                <Form className='form-services'>
                    <Form.Group controlId="">
                    <Form.Label>Nombre del Servicio</Form.Label>
                    <Form.Control type="text" placeholder="¿Cuál es el nombre de su servicio?" onChange={handleService} />
                    </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Duración del servicio</Form.Label>
                    <div className='d-flex justify-content-center'>
                    <Form.Control className='select-form' as="select" defaultValue="0 hrs">
                        <option>0 hrs</option>
                        <option>1 hrs</option>
                        <option>2 hrs</option>
                    </Form.Control>
                    <Form.Control as="select" defaultValue="0 mins">
                        <option>0 mins</option>
                        <option>15 mins</option>
                        <option>30 mins</option>
                        <option>45 mins</option>
                    </Form.Control>
                    </div>
                    </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Precio y tipo de precio</Form.Label>
                    <div className='d-flex justify-content-center'>
                        <Form.Control className='select-form' as="select" defaultValue="">
                            <option>Fijo</option>
                            <option>Varios</option>
                            <option>No mostrar</option>
                            <option>Gratis</option>
                            <option>Precio empieza en...</option>

                        </Form.Control>
                        <Form.Control type="number" placeholder="0€"/>
                    </div>
                    </Form.Group>
                

                <button className='btn-submit mt-3' type="submit">
                    Guardar
                </button>
            </Form> 
        <div>
           <p>¿A qué empleado quieres asociar este servicio? </p> 
        <ListGroup>
            {empleados ? 
            empleados.map((empleado, idx) => <ListGroup.Item key={idx}><input type='checkbox' value={empleado}/><label className='mx-2'>{empleado}</label></ListGroup.Item>) 
            : 'No existen empleados asociados'}
        </ListGroup>

        </div>
    </div>
    </React.Fragment>
    )
}

export default Servicios