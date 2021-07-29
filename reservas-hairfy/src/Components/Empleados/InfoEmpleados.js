import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import './empleados.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

const InfoEmpleados = ({empleado}) => {

    const classes = useStyles()

    const [edit, setEdit] = useState(false)
    const [clickServicio, setClickServicio] = useState(false)
    const [clickHorario, setClickHorario] = useState(false)
    const [clickInfo, setClickInfo] = useState(false)



    // const [empleado, setEmpleado] = useState([])

    // const {id} = useParams()

    // const filtroId = id ? empleados.filter((item) => item.id === id) : empleados
          
    // setEmpleado(empleados[0])

    const handleClickServicio = () => {
        setClickServicio(true)
        setClickHorario(false)
        setClickInfo(false)
    }

    const handleClickHorario = () => {
        setClickHorario(true)
        setClickServicio(false)
        setClickInfo(false)
    }

    const handleClickInfo = () => {
        setClickInfo(true)
        setClickHorario(false)
        setClickServicio(false)
    }


    return (
        <React.Fragment>
        <div className='container-info'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    {/* <Image className='shadow img-profile' src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100" roundedCircle /> */}
                    <Avatar alt={empleado.nombre}  src={empleado.img}  className={classes.large}/>
                    <p className='nombre-profile'>{empleado.nombre}</p>
                </div>
                <button className='btn-edit' onClick={ () => setEdit(true)}>Editar perfil</button>
            </div>
            <hr/>
            <div>
                <ul className='lista-servicios'>
                    <li className={clickServicio && 'active'} onClick={handleClickServicio}>Servicios</li>
                    <li className={clickHorario && 'active'} onClick={handleClickHorario} >Horario laboral</li>
                    <li className={clickInfo && 'active'} onClick={handleClickInfo} >Información personal</li>
                </ul>
            </div>
            <div>
                {/* {clickHorario?empleado.horario : clickServicio?empleado.servicio : clickInfo?empleado.nombre: ''} */}
                
            </div>
        </div>
        </React.Fragment>
    )
}

export default InfoEmpleados
