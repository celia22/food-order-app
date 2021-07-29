import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import './Servicios.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'


const NuevoServicio = ({empleados}) => {

    
    const [servicio, setServicio] = useState('')
    const [mins, setMins] = useState('')
    const [hrs, setHrs] = useState('')
    const [precio, setPrecio] = useState(0)
    const [tipoPrecio, setTipoPrecio] = useState('')
    const [checked, setChecked] = useState(false)



    return (
        <React.Fragment>
                <h4 className='titulo-servicio'>Nuevo Servicio</h4>
                <div className='d-flex mt-3'>
                <Form className='form-services'>
                    <Form.Group controlId="">
                    <Form.Label>Nombre del Servicio</Form.Label>
                    {/* <input type='text' placeholder="¿Cuál es el nombre de su servicio?" value={servicio} onChange={(e)=> setServicio(e.target.value)} /> */}
                    <Form.Control type="text" placeholder="¿Cuál es el nombre de su servicio?" onChange={(e)=> setServicio(e.target.value)} />
                     </Form.Group>

                    <hr className='my-4'/>

                    <Form.Group  controlId="">
                    <Form.Label>Duración del servicio</Form.Label>
                    <div className='d-flex justify-content-center'>
                    <Form.Control className='select-form' as="select" value={hrs} onChange={(e) => setHrs(e.target.value)}>
                        {/* <select className='selectHrs' value={hrs} onChange={handleHora}> */}
                            <option value='0hrs'>0 hrs</option>
                            <option value='1hrs'>1 hrs</option>
                            <option value='2hrs'>2 hrs</option>
                        {/* </select> */}
                    </Form.Control>
                    <Form.Control as="select" className='selectMins' value={mins} onChange={(e)=> setMins(e.target.value)}>
                        {/* <select className='selectMins' > */}
                            <option value='0mins'>0 mins</option>
                            <option value='15mins'>15 mins</option>
                            <option value='30mins'>30 mins</option>
                            <option value='45mins'>45 mins</option>
                        {/* </select>   */}
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
                        {/* <input type='number'   /> */}
                        <Form.Control type="number" value={precio} onChange={(e)=> setPrecio(e.target.value)} placeholder="0€"/>
                    </div>
                    </Form.Group>

                <button className='btn-submit mt-3' type="submit">
                    Guardar
                </button>
            </Form>
            <div className='div-medio'></div>
        <div>
           <p>¿A qué empleado quieres asociar este servicio? </p>
        <ListGroup>
            {empleados ?
            empleados.map((empleado, idx) => <ListGroup.Item key={idx}><input type='checkbox' value={empleado} checked={checked} onClick={()=> setChecked(!checked)} /><label className='mx-2'>{empleado}</label></ListGroup.Item>)
            : 'No existen empleados asociados'}
        </ListGroup>

        </div>
    </div>
    </React.Fragment>
    )
}

export default NuevoServicio