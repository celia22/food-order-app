import React from 'react';
import * as Bi from 'react-icons/bi'
import * as Ri from 'react-icons/ri'
import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'


export const NavbarData = [
    { title: 'Calendario',
        path: '/calendario',
        icon: <Bi.BiCalendarAlt/>,
        class: 'nav-text'
    },
    { title: 'Servicios',
        path: '/servicios',
        icon: <Ri.RiScissorsFill/>,
        class: 'nav-text'
    },
    { title: 'Empleados',
        path: '/empleados',
        icon: <Fi.FiUsers/>,
        class: 'nav-text'
    },
    { title: 'Imágenes',
        path: '/imagenes',
        icon: <Bs.BsCardImage/>,
        class: 'nav-text'
    },
    { title: 'Perfil',
        path: '/perfil',
        icon: <Bi.BiUserCircle/>,
        class: 'nav-text'
    }
]