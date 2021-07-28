import React, { useState, useEffect } from 'react'
import Empleados from '../../Components/Empleados/Empleados'
import InfoEmpleados from '../../Components/Empleados/InfoEmpleados'
import '../../Components/Empleados/empleados.css'
import { Route, useParams } from 'react-router-dom'


const EmpleadosContainer = () => {

    const [empleados, setEmpleados] = useState([])

    const {id} = useParams()

    console.log(id)

    useEffect(() => {
        
        const empleados = [
            {
              id: 1,
              nombre: 'juan',
              servicio: ['cejas'],
              horario: 10-18
            },
            {
              id: 2,
              nombre: 'francisco',
              servicio: ['cejas', 'corte', 'color'],
              horario: 10-18
            },
            {
              id: 3,
              nombre: 'tomas',
              servicio: ['corte'],
              horario: 10-18
            },
            {
              id: 4,
              nombre: 'nicolas',
              servicio: ['corte'],
              horario: 10-18
            },
            {
              id:5,
              nombre: 'jose',
              servicio: ['color'],
              horario: 10-18
            },{
              id: 6,
              nombre: 'joaquin',
              servicio: ['color'],
              horario: 10-18
            }
        ] 
        setEmpleados(empleados)
        
        const filtroId = id ? empleados.filter((item) => item.id === id) : empleados
            console.log(empleados)
    }, [])

    

    return (
        <div className='container-empleados'>
            <div className='d-flex justify-content-between align-items-center'>
              <h2 className='titulo-empleados'>Empleados</h2>
              <button className='btn-add-empleado'>Agregar empleado</button>
            </div>
            <div className='d-flex justify-content-between'>
                <div className='empleados-list'>
                <Empleados empleados={empleados} />
                </div>

                <div>
                  <InfoEmpleados empleados={empleados}/>
                </div>
      
            </div>    
        </div>
    )
}

export default EmpleadosContainer
