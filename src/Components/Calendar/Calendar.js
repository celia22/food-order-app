import * as React from "react";
import { useQuery, useMutation } from "react-query";
import axios from "../../axios/axios";
import { context } from "../../Context/apiProvider";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
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
  ConfirmationDialog,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./Calendar.css";
import { Button } from "@material-ui/core";
import ModalReserva from "../Modal/Modal";

class Calendar extends React.PureComponent {
  static contextType = context;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      data: this.props.appointments,
      setDeleted: false,
      dataBookings: this.props.dataBookings,
      dataEmployees: this.props.dataEmployees,
      dataServices: this.props.dataServices,
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
        data: this.props.appointments,
        dataBookings: this.props.dataBookings,
        dataEmployees: this.props.dataEmployees,
        dataServices: this.props.dataServices,
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

  deleteBooking = async (id) => {
    try {
      await axios.put(`/booking/delete/${id}`);
    } catch (e) {
      console.log(e);
    }
    const filtered = this.state.data.filter((item) => {
      return item._id !== id;
    });

    this.setState({
      data: filtered,
    });
  };

  updateBooking = async (item) => {
    try {
      console.log("date", item.filter.startDate);
      const startDate = item.filter.startDate.toISOString();
      console.log("startdate¿?", startDate);
      const status = item.filter.status;
      const id = item.filter._id;
      const day = startDate.split("-")[2].slice(0, 2);
      const month = startDate.split("-")[1] - 1;
      const year = startDate.split("-")[0];
      const hour = startDate.split("T")[1].slice(0, 2);
      const minute = startDate.split(":")[1];
      await axios.put(
        `/booking/update/${id}`,
        {
          status,
          day,
          month,
          year,
          hour,
          minute,
        },
        id
      );
    } catch (e) {
      console.log(e);
    }
  };

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        let filter;
        data = data.map((appointment) => {
          if (changed[appointment.id]) {
            filter = appointment;
          }

          return changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment;
        });

        this.updateBooking({ filter });
      }
      if (deleted !== undefined) {
        const filtered = data.filter(
          (appointment) => appointment.id === deleted
        );

        this.deleteBooking(filtered[0]._id);
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
    const { data } = this.state;

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
        <Button className="mx-3 btn-agregar" onClick={this.handleShow}>
          Agregar
        </Button>
      </Toolbar.FlexibleSpace>
    );

    return (
      <div className="container-calendar">
        <Paper>
          <Scheduler
            data={data}
            firstDayOfWeek={firstDay}
            locale={locale}
            startTime={8}
            endTime={23}
          >
            <EditingState onCommitChanges={this.commitChanges} />
            <IntegratedEditing />
            <ViewState />
            <Toolbar flexibleSpaceComponent={FlexibleSpace} />
            <MonthView name="Mes" />
            <WeekView name="Semana" startWeekHour={8} endWeekHour={23} />
            <DayView name="Dia" startDayHour={8} endDayHour={23} />
            <TodayButton messages={messages} />
            <ViewSwitcher />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments />
            <DateNavigator />

            <AppointmentTooltip
              showCloseButton
              showDeleteButton
              showOpenButton
              onOpenButtonClick={this.handleEdit}
            />
            <AppointmentForm />
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
            dataBookings={this.state.dataBookings}
            dataEmployees={this.state.dataEmployees}
            dataServices={this.state.dataServices}
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
