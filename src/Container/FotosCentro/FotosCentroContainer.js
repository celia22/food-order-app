import React, { useState } from 'react'
import FotosCentro from '../../Components/FotosCentro/FotosCentro'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Image } from 'react-bootstrap';
import '../../Components/FotosCentro/FotosCentro.css'



const SortableItem = SortableElement(({value}) => <Image className={value.classImg} src={value.src} alt='' style={{width: '30%', padding: '4px' }} onClick={()=> value.setClassImg([...value.classImg, 'active']) }/>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
      {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
          ))}
    </ul>
  );
});
    
    const FotosCentroContainer = () => {
        
    const [classImg, setClassImg] = useState('img-centro')
    const [photos, setPhotos] = useState([{
        src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=70',
        thumbnailWidth: 320,
        thumbnailHeight: 212
    },
    {
        src: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=70',
        thumbnailWidth: 320,
        thumbnailHeight: 212
    },
    {
        src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=70',
        thumbnailWidth: 420,
        thumbnailHeight: 312
    },
    {
        src: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=70',
        thumbnailWidth: 420,
        thumbnailHeight: 312
    },
    {
        src: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=70',
        thumbnailWidth: 420,
        thumbnailHeight: 312
    }])



    const onSortEnd = ({ oldIndex, newIndex }) => {
        setPhotos(arrayMove(photos, oldIndex, newIndex));
      };


    return (
        <>
           <FotosCentro photos={photos}/>

            <div className='d-flex justify-content-center flex-wrap' style={{marginLeft: '90px'}}>   
                <SortableList items={photos} classImg={classImg} setClassImg={setClassImg} onSortEnd={onSortEnd} axis='xy'/>
            </div>
        </>
  );

}

export default FotosCentroContainer
