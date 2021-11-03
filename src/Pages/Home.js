import {context} from "../Context/apiProvider";
import {useContext, useEffect, useState} from "react";
import Calendar from "../Components/Calendar/Calendar";
import {useQueries} from "react-query";
import axios from "../axios/axios";
import AgregarCentro from "../Components/Centro/AgregarCentro";

const Home = () => {
	const apiContext = useContext(context);
	const [existingCenter, setExistingCenter] = useState(true);
	const [bookings, setBookings] = useState([]);
	const [activeBookings, setActiveBookings] = useState([]);

	const data = useQueries([
		{
			queryKey: ["bookings", apiContext.data?.data?._id],
			queryFn: () => axios.get(`center/bookings/${apiContext.data?.data?._id}`),
			enabled: false,
		},
		{
			queryKey: ["Center Services", apiContext.data?.data?._id],
			queryFn: () => axios.get(`/center/services/${apiContext.data?.data?._id}`),
			enabled: false,
		},
		{
			queryKey: ["Center Employees", apiContext.data?.data?._id],
			queryFn: () => axios.get(`/center/employees/${apiContext.data?.data?._id}`),
			enabled: false,
		},
	]);

	useEffect(() => {
		return () => {
			if (apiContext.data?.data?._id) {
				data.forEach((query) => query.refetch());
			}
		};
	}, [apiContext.data]);

	const bookingsArray = [];

	const bookingsTranslator = () => {
		/*********** loop each booking and compares with employees id array ********/
		let employeeName = [];
		data[0].data.data.forEach((item) => {
			data[2].data.data.forEach((x) => {
				if (item.employee.includes(x._id)) {
					employeeName.push(x.firstName + " " + x.lastName);
				}
			});
		});

		/*********** loop each booking and compares with service id array ********/
		let serviceName = [];

		data[0].data.data.forEach((item) => {
			data[1].data.data.forEach((x) => {
				if (item.service.includes(x._id)) {
					serviceName.push(x.name);
				}
			});
		});

		const activeBookings = data[0].data.data.filter((x) => x.active);

		activeBookings.forEach((item, index) => {
			bookingsArray.push({
				id: index,
				status: activeBookings[index].status,
				title: ` Servicio: ${serviceName[index]}, Empleado/a: ${employeeName[index]}`,
				employee: `Empleado/a: ${employeeName[index]}`,
				startDate: activeBookings[index].startTime,
				endDate: activeBookings[index].endTime,
				_id: activeBookings[index]._id,
			});
		});
		setBookings(bookingsArray);
		setActiveBookings(activeBookings);
	};

	useEffect(() => {
		if (data[0].data && data[1].data && data[2].data) {
			bookingsTranslator();
		} else {
			setExistingCenter(false);
		}
	}, []);

	return (existingCenter
			? <Calendar
				appointments={bookings}
				data={data}
				dataBookings={activeBookings}
				dataEmployees={data[2].data}
				dataServices={data[1].data}
			/>
			: <AgregarCentro/>
	)
};

export default Home;
