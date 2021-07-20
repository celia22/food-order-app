import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import './empleados.css'

const InfoEmpleados = ({empleados}) => {

    const [edit, setEdit] = useState(false)

    // const [empleado, setEmpleado] = useState([])

    // const {id} = useParams()

    // const filtroId = id ? empleados.filter((item) => item.id === id) : empleados
          
    // setEmpleado(empleados[0])

    const editProfile = () => {

    }


    return (
        <React.Fragment>
        <div className='container-info'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <Image className='shadow img-profile' src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100" roundedCircle />
                    <p className='nombre-profile'>juan</p>
                </div>
                <button className='btn-edit' onClick={editProfile}>Editar perfil</button>
            </div>
            <hr/>
            <div>
                <ul className='lista-servicios'>
                    <li>Servicios</li>
                    <li>Horario laboral</li>
                    <li>Información personal</li>
                </ul>
            </div>
        </div>
        </React.Fragment>
    )
}

export default InfoEmpleados
