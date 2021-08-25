import React, { useEffect, useState } from 'react'
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { CgFormatText } from 'react-icons/cg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import NuevoServicio from '../../Components/Servicios/NuevoServicio'
import '../../Components/Servicios/Servicios.css'

const ServiciosContainer = () => {

    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [servEdit, setServEdit] = useState({})
    const [empleados, setEmpleados] = useState([])
    const [servicios, setServicios] = useState([
        {
        id: 1,    
        servicio: 'Corte',
        tipoPrecio: 'empieza en',
        precio: 40,
        duracion: '30 min'
    }, 
    {
        id: 2, 
        servicio: 'Color',
        tipoPrecio: 'empieza en',
        precio: 70,
        duracion: '45 min'
    },
    {
        id: 3, 
        servicio: 'Cejas',
        tipoPrecio: 'fijo',
        precio: 20,
        duracion: '15 min'
    },
    {
        id: 4, 
        servicio: 'Manos',
        tipoPrecio: 'fijo',
        precio: 30,
        duracion: '30 min'
    }
])

    useEffect(() => {

        const emple = [ 'empleado1', 'empleado2', 'empleado3', 'empleado4', 'empleado5', 'empleado6', 'empleado7', 'empleado8', 'empleado9', 'empleado10']
        setEmpleados(emple)

    }, [])


    const deleteServicio = (id) => {
        const remove =  servicios.filter(i => i.id !== id)

        setServicios(remove)
    }


    const editServicio = (id) => {
        const filter = servicios.filter(i => i.id === id)
        
        setServEdit(filter[0])
        setEdit(true)
    }



    return (
        <div style={{marginLeft: '125px'}}>
            <div className='d-flex justify-content-between align-items-center' >
            <h2 className='titulo-fotos'>Servicios</h2>
            <button className='btn-agregar mx-5' onClick={() => setShow(!show)}>Agregar servicio</button>
            </div>

            <div className=''>
                {
                    edit ? <NuevoServicio titulo='Editar' servicioEdit={servEdit} empleados={empleados}/>
                    :

                    show ? <NuevoServicio titulo='Nuevo Servicio' empleados={empleados}/> 
                
                    : 
                    
                    <ListGroup className='listaServicios'>
                    {
                        servicios.length && 
                        servicios.map((servicio, idx) => 
                        <ListGroupItem 
                        key={idx}
                        className='itemList d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='nombreServicio'>{servicio.servicio}</p>
                        
                                <div>
                                    Descripción: {servicio.descripcion}
                                    <br/>
                                    Duración: {servicio.duracion} 
                                    <br/>
                                    Precio: {servicio.tipoPrecio} {servicio.precio}€
                                </div>
                           
                            </div>
                                <div className='span-icons'>
                                    <FaTrash className='mx-4 icon' onClick={() => deleteServicio(servicio.id)}/>
                                    <FaEdit className='icon' onClick={() => editServicio(servicio.id)}/>
                                </div>
                        </ListGroupItem>)
                    }    
                    </ListGroup>
                    
                }
            </div>

            
            
        </div>
    )
}

export default ServiciosContainer
