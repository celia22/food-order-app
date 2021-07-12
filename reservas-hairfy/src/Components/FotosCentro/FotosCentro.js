import React, {useState, useEffect} from 'react'
// import {useDropzone} from 'react-dropzone'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import './FotosCentro.css'
import Image from 'react-bootstrap/Image'

const FotosCentro = () => {

    const [fotos, setFotos] = useState([])

        // specify upload params and url for your files
        const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
        
        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
        
        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = (files, allFiles) => {
            //console.log(files.map(f => f.meta))
            // allFiles.forEach(f => f.remove())
            setFotos(allFiles)
            setFotos(files)
            console.log(fotos)
        }

    return (
        <div style={{marginLeft: '8rem'}}>
            <h2 className='titulo-fotos'>Fotos Centro</h2>
            <div className='d-flex justify-content-between'>
                <div className='w-50'>
                    {fotos.length ? 
                    fotos.map((f) => <div>{f.name}</div>)
                    :
                    <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    inputContent='Arrastra o selecciona los archivos'
                    inputWithFilesContent='Agregar'
                    submitButtonContent='Finalizar carga'
                    accept="image/*"
                    styles={{ dropzone: { minHeight: 200, maxHeight: 450 } }}
                    />
                    
                    }
                </div>
                <div>
                {/* {(fotos.length >= 0) && fotos.map((i)=> <Image src={i.file} rounded />)
                } */}
                </div>
            </div>

        </div>
    )
}
export default FotosCentro