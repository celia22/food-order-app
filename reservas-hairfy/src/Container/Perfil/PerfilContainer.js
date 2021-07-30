import { Avatar, FormLabel, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { FaRegClosedCaptioning } from 'react-icons/fa'
import '../../Components/Perfil/perfil.css'

const PerfilContainer = ({centro}) => {

    const [nombre, setNombre] = useState('tal')
    const [horario, setHorario] = useState('8')
    const [telefono, setTelefono] = useState('671180099')
    const [direccion, setDireccion] = useState('balmes 456')
    const [ciudad, setCiudad] = useState('barcelona')
    const [codPostal, setCodPostal] = useState('08008')
    const [checked, setChecked] = useState(false)
    const [edit, setEdit] = useState(false)
     
    
    const editPerfil = () => {
        setEdit(false)
    }


    return (
        <>
            <div className='container'>
             <div className='d-flex justify-content-between align-items-center'>
              <h2 className='titulo-empleados'>Información del centro</h2>
              
              {
                  !edit ? <button className='btn-edit' onClick={()=> setEdit(true)}>Editar</button> 
                  : 
                  <button className='btn-edit' onClick={editPerfil}>Guardar cambios</button>
              }
             </div>
            <Form className='form-profile'>
            <Row className="my-4">
                <Col xs={2}>
                    <Form.Group controlId="">
                    <Avatar className='avatar' />
                        <Form.Control hidden type="file" />
                    </Form.Group>
                </Col>
            
                <Col>
                    <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Nombre del centro</Form.Label>
                     { !edit ? <p>{nombre}</p> 
                        :  
                        <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} />
                        }   
                     </Form.Group>
               

                    <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Telefono del centro</Form.Label>
                        { !edit ? <p>{telefono}</p> 
                            :
                            <Form.Control type="number" value={telefono} onChange={(e)=> setTelefono(e.target.value)} />
                        }
                     </Form.Group>
               
               
                     <Form.Group controlId="" className='mb-4'>
                        <Form.Label>Horario del centro</Form.Label>
                        { !edit ? <p>{horario}</p> 
                            :
                            <Form.Control type="text" value={horario} onChange={(e)=> setHorario(e.target.value)} />
                        }
                     </Form.Group>


                     <Form.Group controlId="">
                        <Form.Check type="checkbox" value={checked} onChange={(e)=> setChecked(!checked)}  label='Quieres que los clientes elijan a los empleados?' />
                     </Form.Group>
                </Col>
                
                <Col>
                
                     <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Dirección del centro</Form.Label>
                        { !edit ? <p>{direccion}</p> 
                            :
                            <Form.Control type="text" value={direccion} onChange={(e)=> setDireccion(e.target.value)} />
                        }
                     </Form.Group>
               

                     <Form.Group controlId="" className='mb-3'>
                        <Form.Label>Ciudad</Form.Label>
                        { !edit ? <p>{ciudad}</p> 
                            :
                            <Form.Control type="text" value={ciudad} onChange={(e)=> setCiudad(e.target.value)} />
                        } 
                     </Form.Group>

                
                     <Form.Group controlId="">
                        <Form.Label>Código postal</Form.Label>
                        { !edit ? <p>{codPostal}</p> 
                            :
                            <Form.Control type="number" value={codPostal} onChange={(e)=> setCodPostal(e.target.value)} />
                        }  
                     </Form.Group>
                </Col>
            </Row>
                
               
            </Form>
            </div>
        </>
    )
}

export default PerfilContainer
