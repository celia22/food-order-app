import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { CgFormatText } from 'react-icons/cg'
import NuevoServicio from '../../Components/Servicios/NuevoServicio'
import '../../Components/Servicios/Servicios.css'

const ServiciosContainer = () => {

    const [show, setShow] = useState(false)
    const [empleados, setEmpleados] = useState([])
    const [servicios, setServicios] = useState([
        {
        servicio: 'corte',
        precio: 40,
        duracion: '30 min'
    }, 
    {
        servicio: 'color',
        precio: 70,
        duracion: '45 min'
    },
    {
        servicio: 'cejas',
        precio: 20,
        duracion: '20 min'
    },
    {
        servicio: 'manos',
        precio: 30,
        duracion: '30 min'
    }
])

    useEffect(() => {

        const emple = [ 'empleado1', 'empleado2', 'empleado3', 'empleado4']
        setEmpleados(emple)

    //     const servi = [
    //         {
    //         servicio: 'corte',
    //         precio: 40,
    //         duracion: '30 min'
    //     }, 
    //     {
    //         servicio: 'color',
    //         precio: 70,
    //         duracion: '45 min'
    //     },
    //     {
    //         servicio: 'cejas',
    //         precio: 20,
    //         duracion: '20 min'
    //     },
    //     {
    //         servicio: 'manos',
    //         precio: 30,
    //         duracion: '30 min'
    //     }
    // ]
      //  setServicios(servi)

    }, [])


    return (
        <div style={{marginLeft: '125px'}}>
            <div className='d-flex justify-content-between align-items-center' >
            <h2 className='titulo-fotos'>Servicios</h2>
            <button className='btn-agregar mx-5' onClick={() => setShow(!show)}>Agregar servicio</button>
            </div>

            <div className=''>
                {
                    show ? <NuevoServicio empleados={empleados}/> 
                    
                    : 
                    
                    <ListGroup className='listaServicios'>
                    {
                        servicios.length && servicios.map((servicio) => <ListGroupItem className='itemList d-flex justify-content-around'>{servicio.servicio}<span>{servicio.duracion} </span><span>{servicio.precio}€</span></ListGroupItem>)
                    }    
                    </ListGroup>
                    
                }
            </div>

            
            
        </div>
    )
}

export default ServiciosContainer
