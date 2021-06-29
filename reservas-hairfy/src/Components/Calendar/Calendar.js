import React, { useState, useEffect, createRef } from 'react'
// import moment from 'moment'
import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import TuiCalendar from 'tui-calendar';
import './Calendar.css'




const CalendarUi = () => {

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
    // 'month.holidayExceptThisMonth.color': '#f3acac',
    'month.dayExceptThisMonth.color': '#ffffff42',
    // 'month.weekend.backgroundColor': '#fafafa',
    'month.day.fontSize': '16px',

    // month schedule style
    'month.schedule.borderRadius': '5px',
    'month.schedule.height': '18px',
    // 'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '10px',
    'month.schedule.marginRight': '10px',

    // month more view
    // 'month.moreView.boxShadow': 'none',
    // 'month.moreView.paddingBottom': '0',
    // 'month.moreView.border': '1px solid #9384e1',
    // 'month.moreView.backgroundColor': 'rgba(38,34,74,.49)',
    // 'month.moreViewTitle.height': '28px',
    // 'month.moreViewTitle.marginBottom': '0',
    // 'month.moreViewTitle.backgroundColor': '#1b1539',
    // 'month.moreViewTitle.borderBottom': '1px solid #9384e1',
    // 'month.moreViewTitle.padding': '0 10px',
    // 'month.moreViewList.padding': '10px',
    // 'month.moreViewTitle.color': '#ffffff',

    //  // week header 'dayname'
    //  'week.dayname.height': '41px',
    //  'week.dayname.borderTop': '1px solid #ddd',
    //  'week.dayname.borderBottom': '1px solid #ddd',
    //  'week.dayname.borderLeft': '1px solid #ddd',
    //  'week.dayname.paddingLeft': '5px',
    //  'week.dayname.backgroundColor': 'inherit',
        'week.dayname.textAlign': 'center',
        'week.today.color': '#F5BC41',
    //  'week.pastDay.color': '#999',

    //  // week vertical panel 'vpanel'
    //  'week.vpanelSplitter.border': '1px solid #ddd',
    //  'week.vpanelSplitter.height': '3px',

    //  // week daygrid 'daygrid'
    //  'week.daygrid.borderRight': '1px solid #ddd',
    //  'week.daygrid.backgroundColor': 'inherit',

    //  'week.daygridLeft.width': '77px',
    //  'week.daygridLeft.backgroundColor': '#a8def74d',
    //  'week.daygridLeft.paddingRight': '5px',
    //  'week.daygridLeft.borderRight': '1px solid #ddd',

    //  'week.today.backgroundColor': '#b857d81f',
    //  'week.weekend.backgroundColor': 'inherit',

    //  // week timegrid 'timegrid'
    //  'week.timegridLeft.width': '77px',
    'week.timegridLeft.backgroundColor': '#FFFFFF',
    //  'week.timegridLeft.borderRight': '1px solid #ddd',
    //  'week.timegridLeft.fontSize': '12px',
    //  'week.timegridLeftTimezoneLabel.height': '51px',
    //  'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

    //  'week.timegridOneHour.height': '48px',
    //  'week.timegridHalfHour.height': '24px',
    //  'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
    //  'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

    //  'week.timegrid.paddingRight': '10px',
    //  'week.timegrid.borderRight': '1px solid #ddd',
    //  'week.timegridSchedule.borderRadius': '0',
    //  'week.timegridSchedule.paddingLeft': '0',

    //  'week.currentTime.color': '#135de6',
    //  'week.currentTime.fontSize': '12px',
    //  'week.currentTime.fontWeight': 'bold',

    //  'week.pastTime.color': '#808080',
    //  'week.pastTime.fontWeight': 'normal',

    // 'week.futureTime.color': '#333',
    //  'week.futureTime.fontWeight': 'normal',

    //  'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
    //  'week.currentTimeLineBullet.backgroundColor': '#135de6',
    //  'week.currentTimeLineToday.border': '1px solid #135de6',
    //  'week.currentTimeLineFuture.border': '1px solid #135de6',

    //  // week creation guide style
    //  'week.creationGuide.color': '#135de6',
    //  'week.creationGuide.fontSize': '12px',
    //  'week.creationGuide.fontWeight': 'bold',

    //  // week daygrid schedule style
    //  'week.dayGridSchedule.borderRadius': '0',
    //  'week.dayGridSchedule.height': '18px',
    //  'week.dayGridSchedule.marginTop': '2px',
    //  'week.dayGridSchedule.marginLeft': '10px',
    //  'week.dayGridSchedule.marginRight': '10px'
  }

  const calendarRef = createRef()

  //Set view of the calendar
  const [currView, setCurrView] = useState('month')

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

  //New schedule popup
  const handleNewSchedule = event => {
    const calendarInstance = calendarRef.current.getInstance()
    calendarInstance.openCreationPopup(event.schedule)
  }

  //Create new schedule
  const handleCreateSchedule = event => {
    let copySchedule = newScheduleList

    let newSchedule = {
      id: Date.now(),
      calendarId: event.calendarId,
      title: event.title,
      category: 'time',
      start: event.start,
      end: event.end
    }

    copySchedule.push(newSchedule)

    setNewScheduleList([...copySchedule])
  }

  //Edit schedule
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

  //Delete schedule
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
        daynames: ['Dom','Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab']
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
    useDetailPopup: true,
    useCreationPopup: true,
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
  </div>
  </React.Fragment>
  )
}

export default CalendarUi