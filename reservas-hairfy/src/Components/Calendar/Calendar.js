import React, { useState, useEffect, createRef } from 'react'
// import moment from 'moment'
import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import TuiCalendar from 'tui-calendar';




const CalendarUi = () => {
    
    let calendar = new Calendar('#calendar', {
        defaultView: 'month',
        taskView: true,
        template: {
          monthDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
          }
        }
      });


  return(
    <Calendar usageStatistics={false}/>
  )
}

export default CalendarUi