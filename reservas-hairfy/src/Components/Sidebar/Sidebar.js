import React, { useState } from 'react';
import './Sidebar.css'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";
    import { FaCalendar } from "react-icons/fa";
    import { FaBars, FaImages, FaUserCircle } from "react-icons/fa";
    import { CgClose } from "react-icons/cg";
    import { RiScissors2Fill } from "react-icons/ri";
    import { ImUsers} from 'react-icons/im'
    import "react-pro-sidebar/dist/css/styles.css";
    import {Link} from 'react-router-dom'
    

const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(true)

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FaBars/>
                ) : (
                  <CgClose/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
                <MenuItem active={true} icon={<FaCalendar/>}>
                  Calendario
                  <Link to='/calendar'/>
                </MenuItem>
              
                <MenuItem icon={<RiScissors2Fill/>}>
                  Servicios 
                  <Link to='/services'/>
                </MenuItem>

              
              <MenuItem icon={<ImUsers/>}>
                Empleados
                <Link to='/employees'/>
              </MenuItem>
  
              <MenuItem icon={<FaImages/>}>
                Imágenes
                <Link to='/images'/>
              </MenuItem>
             
              <MenuItem icon={<FaUserCircle/>}>
                Perfil
                <Link to='/profile'/>
              </MenuItem>
              
            </Menu>
          </SidebarContent>
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FaUserCircle/>}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
        </ProSidebar>
      </div>
    </>
  );
}


export default Sidebar;