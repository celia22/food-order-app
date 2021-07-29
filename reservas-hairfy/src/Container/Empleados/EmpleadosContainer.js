import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import Empleados from '../../Components/Empleados/Empleados'
import '../../Components/Empleados/empleados.css'


const EmpleadosContainer = () => {

    const [empleados, setEmpleados] = useState([])
    const [empleadoInfo, setEmpleadoInfo] = useState({})


    useEffect(() => {
        
        const empleados = [
            {
              id: 1,
              nombre: 'juan',
              servicio: ['cejas'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'
            },
            {
              id: 2,
              nombre: 'francisco',
              servicio: ['cejas', 'corte', 'color'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'

            },
            {
              id: 3,
              nombre: 'tomas',
              servicio: ['corte'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'

            },
            {
              id: 4,
              nombre: 'nicolas',
              servicio: ['corte'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'

            },
            {
              id:5,
              nombre: 'jose',
              servicio: ['color'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'

            },{
              id: 6,
              nombre: 'joaquin',
              servicio: ['color'],
              horario: 10-18,
              img: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100'

            }
        ] 
        setEmpleados(empleados)
        
        // const filtroId = id ? empleados.filter((item) => item.id === id) : empleados
        //     console.log(empleados)
    }, [])


    console.log(empleados)
    

    return (
        <div className='container-empleados'>
            <div className='d-flex justify-content-between align-items-center'>
              <h2 className='titulo-empleados'>Empleados</h2>
              <button className='btn-add-empleado'>Agregar empleado</button>
            </div>

  

            {/* <div className='d-flex justify-content-between'>  */}
               <div className='empleados-list'>
                  <Empleados empleados={empleados} />
                </div> 

                {/* <div>
                  <InfoEmpleados empleados={empleados}/>
                </div> */}
      
            {/* </div>   */}
        </div>
    )
}

export default EmpleadosContainer
