import * as React from "react";
import { context } from "../../Context/apiProvider";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
  EditRecurrenceMenu,
  DragDropProvider,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./Calendar.css";
import { Button } from "@material-ui/core";
import ModalReserva from "../Modal/Modal";

class Calendar extends React.PureComponent {
  static contextType = context;

  constructor(props) {
    super(props);

    this.state = {
      fakeData: this.props.appointments,
      show: false,
      data: this.props.data,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.handleCrearNuevaCita = this.handleCrearNuevaCita.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.appointments !== prevProps.appointments) {
      this.setState({
        fakeData: this.props.appointments,
      });
    }
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
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
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
    const title = event.target[0].value;
    const service = event.target[1].value;
    const employee = event.target[2].value;
    const day = event.target[3].value.split("-")[2];
    const month = event.target[3].value.split("-")[1] - 1;
    const year = event.target[3].value.split("-")[0];

    const startTime = event.target[4].value
      .split(":")
      .map((el) => parseInt(el));
    const endTime = event.target[5].value.split(":").map((el) => parseInt(el));

    const newAppointment = {
      title: title,
      service: service,
      employee: employee,
      startDate: new Date(year, month, day, startTime[0], startTime[1]),
      endDate: new Date(year, month, day, endTime[0], endTime[1]),
    };
    this.setState((state) => {
      let { data } = state;
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...newAppointment }];
      console.log("send this to the backend", data);
      return { data };
    });
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleEdit() {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    this.setState({
      data: this.context.data,
      ...this.state,
    });
  }

  render() {
    const { fakeData } = this.state;
    const { data } = this.state;

    //console.log("fakedata", fakeData);

    const firstDay = 1;
    const locale = "es-ES";
    const messages = { today: "Hoy" };

    const {
      shadePreviousCells,
      shadePreviousAppointments,
      updateInterval,
    } = true;

    const FlexibleSpace = () => (
      <Toolbar.FlexibleSpace>
        {/* <Button className="mx-3 btn-agregar" onClick={this.handleShow}>
          Agregar
        </Button> */}
      </Toolbar.FlexibleSpace>
    );

    return (
      <div className="container-calendar">
        <Paper>
          <Scheduler
            data={fakeData}
            firstDayOfWeek={firstDay}
            locale={locale}
            startTime={8}
            endTime={23}
          >
            <EditingState onCommitChanges={this.commitChanges} />
            <ViewState />
            <Toolbar flexibleSpaceComponent={FlexibleSpace} />
            <MonthView name="Mes" />
            <WeekView name="Semana" startWeekHour={8} endWeekHour={23} />
            <DayView name="Dia" startDayHour={8} endDayHour={23} />
            <TodayButton messages={messages} />
            <ViewSwitcher />
            <Appointments />
            <DateNavigator />
            <EditRecurrenceMenu />
            <AppointmentTooltip
              showCloseButton
              showDeleteButton
              showOpenButton
              onOpenButtonClick={this.handleEdit}
            />
            <DragDropProvider />
            <CurrentTimeIndicator
              shadePreviousCells={shadePreviousCells}
              shadePreviousAppointments={shadePreviousAppointments}
              updateInterval={updateInterval}
            />
          </Scheduler>
        </Paper>

        {this.state.show && (
          <ModalReserva
            data={data}
            show={this.state.show}
            close={this.handleClose}
            submit={(e) => this.handleCrearNuevaCita(e)}
          />
        )}
      </div>
    );
  }
}

export default Calendar;
