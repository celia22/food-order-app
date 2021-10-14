import { context } from "../Context/apiProvider";
import { useContext, useEffect, useState } from "react";
import Calendar from "../Components/Calendar/Calendar";
import { useMutation, useQueries, useQuery } from "react-query";
import axios from "../axios/axios";
import timeConverter from "../helpers/helpers";

const Home = (props) => {
  const apiContext = useContext(context);
  const [bookings, setBookings] = useState([]);

  const data = useQueries(
    [
      {
        queryKey: ["bookings", apiContext.data?.data?._id],
        queryFn: () =>
          axios.get(`center/bookings/${apiContext.data?.data?._id}`),
      },
      {
        queryKey: ["Center Services", apiContext.data?.data?._id],
        queryFn: () =>
          axios.get(`/center/services/${apiContext.data?.data?._id}`),
      },
      {
        queryKey: ["Center Employees", apiContext.data?.data?._id],
        queryFn: () =>
          axios.get(`/center/employees/${apiContext.data?.data?._id}`),
      },
    ],
    {
      enabled: false,
      onSuccess: () => console.log(data),
    }
  );

  useEffect(() => {
    return () => {
      apiContext.data && data.forEach((query) => query.refetch());
    };
  }, [apiContext.data]);

  const bookingsArray = [];

  const bookingsTranslator = () => {
    data[0].data.data.map((item, index) => {
      bookingsArray.push({
        id: index,
        title: `Servicio: ${data[1].data.data[index].name} , Empleado/a: ${
          data[2].data.data[data[0].data.data[index].employee]
        }`,
        startTime: `${data[0].data.data[0].startTime}`,
        endTime: `${data[0].data.data[0].endTime}`,
      });
      console.log("index", data[0].data.data[0].employee);
      console.log("employee", data[2].data.data);
      console.log("employee name", data[2].data.data[index].firstName);
    });

    setBookings(bookingsArray);
  };

  useEffect(() => {
    if (data[0].data && data[1].data && data[2].data) {
      bookingsTranslator();
    }
  }, [data[0].data, data[1].data, data[2].data]);

  console.log("bookings", bookings);

  return <Calendar appointments={bookings} />;
};

export default Home;
