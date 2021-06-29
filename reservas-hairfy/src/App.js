import './App.css';
import React, { useState, useEffect, createRef } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar'
import CalendarUi from './Components/Calendar/Calendar';
import './App.css';
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import Servicios from './Components/Servicios/Servicios'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
       <Sidebar/> 
      <Switch>
        <Route path='/calendar'>
      <CalendarUi/>
        </Route>
        <Route path='/services'>
      <Servicios/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;