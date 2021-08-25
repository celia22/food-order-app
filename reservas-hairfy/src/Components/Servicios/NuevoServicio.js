import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import './Servicios.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'


const NuevoServicio = ({titulo, servicioEdit, empleados}) => {

    
    const [servicio, setServicio] = useState(servicioEdit ? servicioEdit.servicio :'')
    const [mins, setMins] = useState(servicioEdit ? servicioEdit.duracion : '')
    const [hrs, setHrs] = useState('')
    const [precio, setPrecio] = useState(servicioEdit ? servicioEdit.precio : 0)
    const [tipoPrecio, setTipoPrecio] = useState(servicioEdit ? servicioEdit.tipoPrecio :'')
    const [checked, setChecked] = useState(false)
    const [intervalHrs, setIntervalHrs] = useState(0)
    const [intervalMins, setIntervalMins] = useState(0)
    const [descripcion, setDescripcion] = useState(servicioEdit ? servicioEdit.descripcion : '')


    return (
        <React.Fragment>
                <h4 className='titulo-servicio'>{titulo}</h4>
                <div className='d-flex mt-3'>
                <Form className='form-services'>
                    <Form.Group controlId="">
                    <Form.Label>Nombre del Servicio</Form.Label>
                    <Form.Control type="text" value={servicio} placeholder="¿Cuál es el nombre de su servicio?" onChange={(e)=> setServicio(e.target.value)} />
                     </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Duración del servicio</Form.Label>
                    <div className='d-flex justify-content-center'>
                    <Form.Control className='select-form' as="select" value={hrs} onChange={(e) => setHrs(e.target.value)}>
                            <option value='0hrs'>0 hrs</option>
                            <option value='1hrs'>1 hrs</option>
                            <option value='2hrs'>2 hrs</option>
                    </Form.Control>

                    <Form.Control as="select" className='selectMins' value={mins} onChange={(e)=> setMins(e.target.value)}>
                            <option value='0 min'>0 mins</option>
                            <option value='15 min'>15 mins</option>
                            <option value='30 min'>30 mins</option>
                            <option value='45 min'>45 mins</option>
                    </Form.Control>

                    </div>
                    </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Intervalo</Form.Label>
                    <div className='d-flex justify-content-center'>
                    <Form.Control className='select-form' as="select" value={intervalHrs} onChange={(e) => setIntervalHrs(e.target.value)}>
                            <option value='0hrs'>0 hrs</option>
                            <option value='1hrs'>1 hrs</option>
                            <option value='2hrs'>2 hrs</option>
                    </Form.Control>

                    <Form.Control as="select" className='selectMins' value={intervalMins} onChange={(e)=> setIntervalMins(e.target.value)}>
                            <option value='0 min'>0 mins</option>
                            <option value='15 min'>15 mins</option>
                            <option value='30 min'>30 mins</option>
                            <option value='45 min'>45 mins</option>
                    </Form.Control>

                    </div>
                    </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Precio y tipo de precio</Form.Label>
                    <div className='d-flex justify-content-center'>
                        <Form.Control as="select" className='select-form' value={tipoPrecio} onChange={(e)=> setTipoPrecio(e.target.value)}>
                            <option value='fijo'>Fijo</option>
                            <option value='no mostrar'>No mostrar</option>
                            <option value='gratis'>Gratis</option>
                            <option value='empieza en'>Precio empieza en...</option>
                        </Form.Control>

                        <Form.Control type="number" value={precio} onChange={(e)=> setPrecio(e.target.value)} placeholder="0€"/>
                    </div>
                    </Form.Group>

                <button className='btn-agregar mt-3' type="submit">
                    Guardar
                </button>
                </Form>
            <div className='div-medio'></div>
        <div>
            <Form.Group controlId="">
                <Form.Label>Descripción del servicio</Form.Label>
                <Form.Control className='' as="textarea" rows={5} value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} />
            </Form.Group>

            <hr className='my-4'/>

           <p>¿A qué empleado quieres asociar este servicio? </p>
        <ListGroup className='lista-empleados'>
            {empleados ?
            empleados.map((empleado, idx) => <ListGroup.Item key={idx}><input type='checkbox' value={empleado} checked={checked} onClick={()=> setChecked(!checked)} /><label className='mx-2'>{empleado}</label></ListGroup.Item>)
            
            : 'No existen empleados asociados'
        }
        </ListGroup>

        </div>
        
    </div>
    </React.Fragment>
    )
}

export default NuevoServicio