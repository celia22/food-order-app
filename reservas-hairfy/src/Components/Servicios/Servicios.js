import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import './Servicios.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'


const Servicios = () => {

    const [empleados, setEmpleados] = useState([])
    const [servicio, setServicio] = useState('')
    const [duracion, setDuracion] = useState('')
    const [mins, setMins] = useState('')
    const [hrs, setHrs] = useState('')
    const [precio, setPrecio] = useState(0)
    const [tipoPrecio, setTipoPrecio] = useState('')
    const [checked, setChecked] = useState(false)

    useEffect(() => { 
       
        const emple = [ 'empleado1', 'empleado2', 'empleado3', 'empleado4']
        setEmpleados(emple)
    
    }, [])

    const handleService = (event) => {
        setServicio(event.target.value)
        console.log(servicio)
    }

    const handleHora = (event) => {
        setHrs(event.target.value)
        console.log(hrs)
    }

    const handleMins = (event) => {
        setMins(event.target.value)
        console.log(mins)
    }

    const handleTipoPrecio = (event) => {
        setTipoPrecio(event.target.value)
        console.log(tipoPrecio)
    }

    const handlePrecio = (event) => {
        setPrecio(event.target.value)
        console.log(precio)
    }

    return (
        <React.Fragment>
                <h2 className='titulo-servicio'>Nuevo Servicio</h2>
                <div className='d-flex justify-content-around mt-3'>
                <Form className='form-services'>
                    {/* <Form.Group controlId=""> */}
                    <Form.Label>Nombre del Servicio</Form.Label>
                    <input type='text' placeholder="¿Cuál es el nombre de su servicio?" value={servicio} onChange={handleService} />
                    {/* <Form.Control type="text" placeholder="¿Cuál es el nombre de su servicio?" onChange={handleService} /> */}
                    {/* </Form.Group> */}

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Duración del servicio</Form.Label>
                    <div className='d-flex justify-content-center'>
                    {/* <Form.Control className='' as="select" defaultValue="0 hrs"> */}
                        <select className='selectHrs' value={hrs} onChange={handleHora}>
                            <option value='0hrs'>0 hrs</option>
                            <option value='1hrs'>1 hrs</option>
                            <option value='2hrs'>2 hrs</option>
                        </select>
                    {/* </Form.Control> */}
                    {/* <Form.Control as="select" className='selectMins' defaultValue="0 mins"> */}
                        <select className='selectMins' value={mins} onChange={handleMins}>
                            <option value='0mins'>0 mins</option>
                            <option value='15mins'>15 mins</option>
                            <option value='30mins'>30 mins</option>
                            <option value='45mins'>45 mins</option>
                        </select>  
                    {/* </Form.Control> */}
                    </div>
                    </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Precio y tipo de precio</Form.Label>
                    <div className='d-flex justify-content-center'>
                        {/* <Form.Control className='select-form' as="select" defaultValue=""> */}
                        <select value={tipoPrecio} onchange={handleTipoPrecio}>
                            <option value='fijo'>Fijo</option>
                            <option value='varios'>Varios</option>
                            <option value='no mostrar'>No mostrar</option>
                            <option value='gratis'>Gratis</option>
                            <option value='empieza en'>Precio empieza en...</option>
                        </select>
                        {/* </Form.Control> */}
                        <input type='number'  value={precio} onChange={handlePrecio} />
                        {/* <Form.Control type="number" placeholder="0€"/> */}
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