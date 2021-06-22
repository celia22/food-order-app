import React, {useState} from 'react'
import './Navbar.css'
import {NavLink, Link} from 'react-router-dom'
import * as Bi from 'react-icons/bi'
import * as Go from 'react-icons/go'
import * as Cg from 'react-icons/cg'
import {NavbarData} from '../NavbarData/NavbarData'
import { IconContext } from 'react-icons'

export const NavBar = () => {
   
    const [sidebar, setSidebar] = useState(false)
    
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <React.Fragment>
            <IconContext.Provider value={{color: ''}}>

            <div className='navbar-total'>
                <div className='navbar' >
                    <Link to=''>
                        <Go.GoThreeBars onClick={showSidebar}/>
                    </Link>
                    <ul onClick={showSidebar}>
                        {
                            NavbarData.map((item, idx)=> {
                                return(
                                    <li key={idx} className={item.class}>
                                        <NavLink to={item.path}>
                                            {item.icon}
                                            <span className='span-nav'>{item.title}</span>
                                        </NavLink>

                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                        <Link to='' >
                            <Cg.CgClose/>
                        </Link>
                        </li>
                        {
                            NavbarData.map((item, idx)=> {
                                return(
                                    <li key={idx} className={item.class}>
                                        <NavLink to={item.path}>
                                            {item.icon}
                                            <span className='span-nav'>{item.title}</span>
                                        </NavLink>

                                    </li>
                                )
                            })
                        }

                    </ul>
                    </nav>
                    {/* <Link to=''>
                        <Bi.BiHome />
                    </Link> */}
            </div>
            </IconContext.Provider>
        </React.Fragment>
    )
}
