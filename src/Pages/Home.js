import { context } from "../Context/apiProvider";
import { useContext, useEffect } from "react";
import Calendar from "../Components/Calendar/Calendar";
import {useMutation, useQueries, useQuery} from "react-query";
import axios from "../axios/axios";


const Home = (props) => {
	const apiContext = useContext(context);
	const [bookings, setBooking] = useState([]);

	const data = useQueries(
		[
			{
				queryKey: ["bookings", apiContext.data?.data?._id],
				queryFn: () => axios.get(`center/bookings/${apiContext.data?.data?._id}`),
			},
			{
				queryKey: ["Center Services", apiContext?.data?.data?._id],
				queryFn: () => axios.get(`/center/services/${apiContext.data?.data?._id}`)
			},
			{
				queryKey: ["Center Employees", apiContext.data?.data?._id],
				queryFn: () => axios.get(`/center/employees/${apiContext.data?.data?._id}`)
			}
		],
		{
			enabled: false,
			onSuccess: () => console.log(data)
		}
	)

	const bookingsTranslator = () => {
		array.push({
			id: index,
			title: `${data[0].data.data.title}  employee:${data[2].data[data[0].data.employee].name}`
		})

	}

	useEffect(() => {
		return () => {
			apiContext.data && data.forEach(query => query.refetch())
		};
	}, [apiContext.data]);


	return (
		<Calendar />
	)
}

export default Home;