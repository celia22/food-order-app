import * as React from 'react';
import {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
	Scheduler,
	MonthView,
	WeekView,
	DayView,
	TodayButton,
	ViewSwitcher,
	Appointments,
	Toolbar,
	DateNavigator,
	AppointmentTooltip,
	AppointmentForm,
	EditRecurrenceMenu,
	DragDropProvider,
	CurrentTimeIndicator,
    Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import './Calendar.css';
import { Button, withStyles } from '@material-ui/core';
import ModalReserva from '../Modal/Modal';
import { pink, yellow } from '@material-ui/core/colors';

//Esto vendría del backend, tal vez en un context?
const appointments = [
	{
		id: 0,
		title: 'Cita corte de pelo',
		startDate: new Date(2021, 7, 23, 9, 30),
		endDate: new Date(2021, 7, 23, 11, 30),
	}, {
		id: 1,
		title: 'Cita tinte',
		startDate: new Date(2021, 7, 28, 9, 30),
		endDate: new Date(2021, 7, 28, 11, 30),
	}
];


const styles = ({ spacing, palette }) => ({
	flexibleSpace: {
	  margin: '0 auto 0 0',
	  display: 'flex',
	  alignItems: 'center',
	},
	textField: {
	  width: '75px',
	  marginLeft: spacing(1),
	  marginTop: 0,
	  marginBottom: 0,
	  height: spacing(4.875),
	},
	locationSelector: {
	  marginLeft: spacing(1),
	  height: spacing(4.875),
	},
	button: {
	  paddingLeft: spacing(1),
	  paddingRight: spacing(1),
	  width: spacing(10),
	  '@media (max-width: 800px)': {
		width: spacing(2),
		fontSize: '0.75rem',
	  },
	},
	selectedButton: {
	  background: palette.primary[400],
	  color: palette.primary[50],
	  '&:hover': {
		backgroundColor: palette.primary[500],
	  },
	  border: `1px solid ${palette.primary[400]}!important`,
	  borderLeft: `1px solid ${palette.primary[50]}!important`,
	  '&:first-child': {
		borderLeft: `1px solid ${palette.primary[50]}!important`,
	  },
	},
	longButtonText: {
	  '@media (max-width: 800px)': {
		display: 'none',
	  },
	},
	shortButtonText: {
	  '@media (min-width: 800px)': {
		display: 'none',
	  },
	},
	title: {
	  fontWeight: 'bold',
	  overflow: 'hidden',
	  textOverflow: 'ellipsis',
	  whiteSpace: 'nowrap',
	},
	textContainer: {
	  lineHeight: 1,
	  whiteSpace: 'pre-wrap',
	  overflow: 'hidden',
	  textOverflow: 'ellipsis',
	  width: '100%',
	},
	time: {
	  display: 'inline-block',
	  overflow: 'hidden',
	  textOverflow: 'ellipsis',
	},
	text: {
	  overflow: 'hidden',
	  textOverflow: 'ellipsis',
	  whiteSpace: 'nowrap',
	},
	container: {
	  width: '100%',
	}
  });


class Calendar extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			data: appointments,
			show: false
		};

		this.commitChanges = this.commitChanges.bind(this);
		this.handleCrearNuevaCita = this.handleCrearNuevaCita.bind(this);
		this.handleShow = this.handleShow.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleEdit = this.handleEdit.bind(this)


	}

	/**
	 * Esto viene de la documentación y actualiza el state según sea necesario (add, change or delete an appointment)
	 * @param added {object}
	 * @param changed {object}
	 * @param deleted {object}
	 * @return {undefined}
	 */
	commitChanges({ added, changed, deleted }) {
		this.setState((state) => {
			let { data } = state;
			if (added) {
				const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
				data = [...data, { id: startingAddedId, ...added }];
			}
			if (changed) {
				data = data.map(appointment => (
					changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
			}
			if (deleted !== undefined) {
				data = data.filter(appointment => appointment.id !== deleted);
			}
			console.log("send this to the backend", data)
			return { data };
		});
	}

	/**
	 * Crea una nueva cita metiendo otro objeto al array "data" del state
	 * @param event
	 * @return {undefined}
	 */
	handleCrearNuevaCita(event) {
		event.preventDefault();
		const title = event.target[0].value
		const service = event.target[1].value
		const employee = event.target[2].value
		const day = event.target[3].value.split('-')[2];
		const month = event.target[3].value.split('-')[1] -1;
		const year = event.target[3].value.split('-')[0];
        
		// const date = event.target[1].valueAsDate;
		// const day = date.getDay() + 1; //you have to do + 1 to get the proper day
		// const month = date.getUTCMonth();
		// const year = date.getFullYear();
		const startTime = event.target[4].value.split(":").map(el => parseInt(el));
		const endTime = event.target[5].value.split(":").map(el => parseInt(el));



		const newAppointment = {
			title: title,
			service: service,
			employee: employee,
			startDate: new Date(year, month, day, startTime[0], startTime[1]),
			endDate: new Date(year, month, day, endTime[0], endTime[1]),
		}
		this.setState((state) => {
			let { data } = state;
			const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
			data = [...data, { id: startingAddedId, ...newAppointment }];
			console.log("send this to the backend", data);
			return { data };

		})
        this.setState({
			show: false
		})


	}

	handleShow(){
		this.setState({
			show: true
		})
	}

	handleClose(){
		this.setState({
			show: false
		})
	}

	handleEdit = () => {

		this.setState({
			show: true
		})

		console.log('edit: ', this.state.show )

	}	
		
	
	
	render() {

		const { data } = this.state;

		const firstDay = 1
		const locale = 'es-ES'
		const messages = {today: 'Hoy'}


		const {shadePreviousCells,shadePreviousAppointments,updateInterval} = true

		const FlexibleSpace = () => (
			<Toolbar.FlexibleSpace>
			  <Button className='mx-3 btn-agregar' onClick={this.handleShow} >Agregar</Button>
			</Toolbar.FlexibleSpace>
		  )

		return (
			<div className="container-calendar">
				<Paper>
					<Scheduler
						data={data}
						firstDayOfWeek={firstDay}
						locale={locale}
						startTime={9} 
						endTime={20}
					>
						<EditingState
							onCommitChanges={this.commitChanges}
						/>
						<ViewState
							// defaultCurrentDate="2021-08-17"
						/>
						<Toolbar 
						flexibleSpaceComponent={FlexibleSpace}
						/>
						<MonthView name='Mes' />
						<WeekView 
						name='Semana' 
						startWeekHour={9}
        				endWeekHour={19}
						/>
						<DayView 
						name='Dia'
						startDayHour={9}
        				endDayHour={19}
						/>
						<TodayButton messages={messages} />
						<ViewSwitcher />
						<Appointments />
						<DateNavigator />
						<EditRecurrenceMenu />
						<AppointmentTooltip
							// contentComponent={TooltipContent}
							showCloseButton
							showDeleteButton
							showOpenButton
							onOpenButtonClick={this.handleEdit}
						/>
						{/* <AppointmentForm /> */}
						<DragDropProvider />
						<CurrentTimeIndicator
						shadePreviousCells={shadePreviousCells}
						shadePreviousAppointments={shadePreviousAppointments}
						updateInterval={updateInterval}
					  />
					</Scheduler>
				</Paper>



				{this.state.show && <ModalReserva show={this.state.show} close={this.handleClose} submit={e => this.handleCrearNuevaCita(e)} />} 
			</div>


		);
	}
}

export default Calendar;