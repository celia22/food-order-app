import { context } from "../Context/apiProvider";
import { useContext, useEffect } from "react";
import Calendar from "../Components/Calendar/Calendar";
import { useMutation, useQuery } from "react-query";
import axios from "../axios/axios";


const Home = (props) => {
	const apiContext = useContext(context);

	const {
		isLoading: bookingsIsLoading,
		error: bookingsError,
		data: bookingsData,
		refetch: bookingsRefetch
	} = useQuery(
		["bookings"],
		() => axios.get(`center/bookings/${apiContext.data.data._id}`),
		{
			enabled: false,
			onSuccess: () => console.log(bookingsData.data)
		}
	);

	const updateUserProfile = useMutation(
		(data) => {
			return axios.put(
				`/user/update/${""}`,
				data
			);
		},
		{
			onError: (error) => console.error(error),
		}
	);

	useEffect(() => {
		return () => {
			apiContext.data && bookingsRefetch()
		};
	}, [apiContext.data]);


	return (
		<Calendar />
	)
}

export default Home;