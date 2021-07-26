import './App.css';
import React, { useState, useEffect, createRef } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar'
import CalendarUi from './Components/Calendar/Calendar';
import './App.css';
// import 'tui-calendar/dist/tui-calendar.css'
// import 'tui-date-picker/dist/tui-date-picker.css'
// import 'tui-time-picker/dist/tui-time-picker.css'
import EmpleadosContainer from './Container/Empleados/EmpleadosContainer';
import InfoEmpleados from './Components/Empleados/InfoEmpleados'
import FotosCentroContainer from './Container/FotosCentro/FotosCentroContainer';
import ServiciosContainer from './Container/Servicios/ServiciosContainer';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
       <Sidebar/> 
      <Switch>
        <Route path='/servicios'>
      <ServiciosContainer/>
        </Route>
        <Route path='/imagenes'>
          <FotosCentroContainer/>
        </Route>
        <Route path='/empleados'>
          <EmpleadosContainer/>
          {/* <Route path='/empleados:id'>
            <InfoEmpleados/>
          </Route> */}
        </Route>
        <Route path='/'>
      <CalendarUi/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;