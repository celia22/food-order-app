import React, { useState, useEffect, createRef } from 'react'
// import moment from 'moment'
import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import TuiCalendar from 'tui-calendar';
import './Calendar.css'
import ModalSchedule from '../ModalSchedule/ModalSchedule'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';


const CalendarUi = () => {

  const servicios = ['corte', 'color', 'cejas' , 'bla']
          //Custom theme for the calendar
  const customTheme = {
    //Common style
    'common.border': 'thin solid #C1C1C1',
    'common.backgroundColor': '#FFFFFF',
    'common.holiday.color': '#9d93d5',
    'common.saturday.color': '#9d93d5',
    'common.dayname.color': 'black',

    //Month header 'dayname'
    'month.dayname.height': '42px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '0',
    'month.dayname.paddingRight': '0',
    'month.dayname.fontSize': '13px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'center',

    // month day grid cell 'day'
    'month.dayExceptThisMonth.color': '#ffffff42',
    // 'month.weekend.backgroundColor': '#fafafa',
    'month.day.fontSize': '16px',

    // month schedule style
    'month.schedule.borderRadius': '5px',
    'month.schedule.height': '18px',
    'month.schedule.marginLeft': '10px',
    'month.schedule.marginRight': '10px',
    'week.dayname.textAlign': 'center',
    'week.today.color': '#F5BC41',
    'week.timegridLeft.backgroundColor': '#FFFFFF',
    
  }

  const calendarRef = createRef()

  //Set view of the calendar
  const [currView, setCurrView] = useState('month')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCurrView = view => {
      if(view === 'Dia'){
        setCurrView('day')
      } else if(view === 'Semana'){
        setCurrView('week')
      } else if (view === 'Mes'){
        setCurrView('month')
      }
    
  }

  const view = [
    'Dia',
    'Semana',
    'Mes'
  ]


  //Preview and Next function for the calendar
  const handlePrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance()
    calendarInstance.prev()
  }

  const handleNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance()
    calendarInstance.next()
  }

  // Today function
  const handleTodayButton = () => {
    const calendarInstance = calendarRef.current.getInstance()
    calendarInstance.today()
  }
  

  //Sample schedule
  const [newScheduleList, setNewScheduleList] = useState([])
  const [scheduleList, setSchedule] = useState([])

  //Calendar schedule categories
  const calendarCat = [
    {
      id: '0',
      name: 'Empleado1',
      bgColor: '#9e5fff',
      borderColor: '#9e5fff'
    },
    {
      id: '1',
      name: 'Empleado2',
      bgColor: '#00a9ff',
      borderColor: '#00a9ff'
    },
    {
      id: '2',
      name: 'Empleado3',
      bgColor: '#03bd9e',
      borderColor: '#03bd9e'
    }
  ]

    /******///NUEVO SCHEDULE/******/
  const handleNewSchedule = event => {
    const calendarInstance = calendarRef.current.getInstance()
    calendarInstance.openCreationPopup(event.schedule)
    
    
  }

  /******///CREAR/******/
  const handleCreateSchedule = event => {
    let copySchedule = newScheduleList
    
    console.log('beforeCreateSchedule', event)

    handleShow()

    // let newSchedule = {
    //   id: Date.now(),
    //   calendarId: event.calendarId,
    //   title: event.title,
    //   category: 'time',
    //   start: event.start,
    //   end: event.end
    // }

    // copySchedule.push(newSchedule)

    setNewScheduleList([...copySchedule])
  }

  /******///EDITAR/******/
  const handleUpdateSchedule = event => {
    const updatedId = event.schedule.id
    let copySchedule = newScheduleList
    let updateSchedule

    copySchedule.forEach((item, index) => {
      if (item.id === updatedId) {
        updateSchedule = {
          id: event.schedule.id,
          calendarId: event.schedule.calendarId,
          title: event.schedule.title,
          category: 'time',
          start: event.start,
          end: event.end
        }

        copySchedule[index] = updateSchedule
      }
    })

    setNewScheduleList([...copySchedule])
  }

  /******///ELIMINAR/******/
  const handleDeleteSchedule = event => {
    const deleteId = event.schedule.id
    let copySchedule = newScheduleList

    copySchedule.forEach((item, index) => {
      if (item.id === deleteId) {
        copySchedule.splice(index, 1)
      }
    })

    setNewScheduleList([...copySchedule])
  }

  //Set current Schedule
  useEffect(() => {
    setSchedule(newScheduleList)
  }, [scheduleList, newScheduleList])

  //Filter schedule category
  const [filterCat, setFilterCat] = useState([
    {
      name: 'Empleado1',
      check: true
    },
    {
      name: 'Empleado2',
      check: true
    },
    {
      name: 'Empleado3',
      check: true
    },
  ])  

  const handleFilterCat = catIndex => {
    let copyFilterCat = filterCat

    copyFilterCat[catIndex].check = !copyFilterCat[catIndex].check
    setFilterCat([...copyFilterCat])
  }

  useEffect(() => {
    const calendarInstance = calendarRef.current.getInstance()

    filterCat.forEach((filter, index) => {
      if (filter.check === true) {
        calendarInstance.toggleSchedules(index.toString(), false, true)
      } else {
        calendarInstance.toggleSchedules(index.toString(), true, true)
      }
    })
  })

  // Custom schedule popup template
  const schedPopupTemplate = {
    titlePlaceholder: () => {
      return 'Reserva'
    },
    alldayTitle: () => {
      return '<span class="tui-full-calendar-left-content" style="color: #fff">All Day</span>'
    },
  }

  //Set calendar features/options
  const calendarOptions = {
    usageStatistics: false,
    theme: customTheme,
    week: {
        startDayOfWeek: 1,
        daynames: ['Dom','Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
        hourStart: 7,
        hourEnd: 20
    },
    month: {
        startDayOfWeek: 1,
        daynames: [ 'Dom','Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab']
    },
    taskView: false,
    scheduleView: true,
    view: currView,
    disableDblClick: true,
    disableClick: false,
    useDetailPopup: false,
    useCreationPopup: false,
    schedules: scheduleList,
    template: schedPopupTemplate,
    calendars: calendarCat,
    onBeforeCreateSchedule: handleCreateSchedule,
    onBeforeUpdateSchedule: handleUpdateSchedule,
    onBeforeDeleteSchedule: handleDeleteSchedule
  }



  return(
      <React.Fragment>
    <div className='container-calendar'>
      <div className='container-btns'>
        <div className='btn-container'>
                <div className='btn-view'>
                {view.map(item => (
                <button key={item} className='btns-view' onClick={() => handleCurrView(item)}>{item}</button>
                ))}
                
            </div>
            <div className='btn-next'>
                <button className='btns-next' onClick={handlePrevButton}>Prev</button>
                <button className='btns-next' onClick={handleTodayButton}>Hoy</button>
                <button className='btns-next' onClick={handleNextButton}>Prox</button>
            
            </div>
        </div>
        <div className='check-filters'>
          {filterCat.map((item,index) => (
            <label key={index}><input className='checks' type="checkbox" checked={item.check} onChange={() => handleFilterCat(index)}/>{item.name}</label>
          ))}
        </div>
        <div>
            <button className='btn-agregar' onClick={handleNewSchedule}>Agregar cita</button>
        </div>
      </div>
      <Calendar
        ref={calendarRef}
        {...calendarOptions}
      />
      
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <label>Servicio</label>
      <select>
          {
              servicios.map((item, idx)=> <option key={idx}>{item}</option>)
          }
      </select>
      <br/>
      <label>Empleado</label>
      <select>
          {
              servicios.map((item, idx)=> <option key={idx}>{item}</option>)
          }
      </select>
      <br/>
      <label>Día y hora</label>
          <input type='date'/>
          <input type='time'/>
      </form>
      
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleClose}>
          Guardar reserva
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  </React.Fragment>
  )
}

export default CalendarUi