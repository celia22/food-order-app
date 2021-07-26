import React, {useState, useEffect} from 'react'
// import {useDropzone} from 'react-dropzone'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import './FotosCentro.css'
import Image from 'react-bootstrap/Image'
import { Button } from 'bootstrap'

const FotosCentro = ({photos}) => {

   const [show, setShow] = useState(false)

        // specify upload params and url for your files
        const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
        
        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
        
        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = ( allFiles) => {
            //console.log(files.map(f => f.meta))
            // allFiles.forEach(f => f.remove())
            
        }

          

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center' style={{marginLeft: '125px'}}>
            <h2 className='titulo-fotos'>Fotos Centro</h2>
            <button className='btn-agregar mx-5' onClick={() => setShow(!show)}>Agregar imagenes</button>
            </div>

            <div className=''>

                {
                    show && 
                    <div className='my-3'>
                    <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    inputContent='Arrastra o selecciona los archivos'
                    inputWithFilesContent='Agregar'
                    submitButtonContent='Finalizar carga'
                    accept="image/*"
                    styles={{ dropzone: { minHeight: 200, maxHeight: 450, width: 1030 } }}
                    />
                    </div>
                }
                

                {
                    photos.length <= 0 && <p>No tienes fotos subidas! Haz click en agregar fotos</p>
                }

                {/* <div>
                <aside style={thumbsContainer}>{thumbs}</aside>
                { {(fotos.length >= 0) && fotos.map((i)=> <Image src={i.file} rounded />)
                }
                {(fotos.length >= 0) && fotos.map((i)=><Image src={i.freview} rounded /> )
                }
                </div> */}
            </div>

        </div>
    )
}
export default FotosCentro