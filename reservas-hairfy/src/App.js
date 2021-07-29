import './App.css';
import React, { useState, useEffect, createRef } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar'
import CalendarUi from './Components/Calendar/Calendar';
import './App.css';
import EmpleadosContainer from './Container/Empleados/EmpleadosContainer';
import InfoEmpleados from './Components/Empleados/InfoEmpleados'
import FotosCentroContainer from './Container/FotosCentro/FotosCentroContainer';
import ServiciosContainer from './Container/Servicios/ServiciosContainer';
import PerfilContainer from './Container/Perfil/PerfilContainer';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
       <Sidebar/> 
      <Switch>
        <Route exact path='/servicios'>
      <ServiciosContainer/>
        </Route>
        <Route exact path='/imagenes'>
          <FotosCentroContainer/>
        </Route>
        <Route exact path='/empleados'>
          <EmpleadosContainer/>
        </Route>
        <Route exact path='/perfil'>
      <PerfilContainer/>
        </Route>
        <Route exact path='/'>
      <CalendarUi/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;