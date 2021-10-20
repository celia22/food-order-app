import { context } from "../Context/apiProvider";
import { useContext, useEffect, useState } from "react";
import Calendar from "../Components/Calendar/Calendar";
import { useMutation, useQueries, useQuery } from "react-query";
import axios from "../axios/axios";

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
    let employeeName = [];

    for (let i = 0; i < data[0].data.data.length; i++) {
      for (let j = 0; j < data[2].data.data.length; j++) {
        if (data[0].data.data[i].employee === data[2].data.data[j]._id) {
          employeeName.push(
            data[2].data.data[j].firstName + " " + data[2].data.data[j].lastName
          );
        }
      }
    }

    let serviceName = [];

    for (let i = 0; i < data[0].data.data.length; i++) {
      for (let j = 0; j < data[1].data.data.length; j++) {
        if (data[0].data.data[i].service === data[1].data.data[j]._id) {
          serviceName.push(data[1].data.data[j].name);
        }
      }
    }

    data[0].data.data.map((item, index) => {
      console.log("name?", data[1].data.data[index]);
      console.log("bookings", data[0].data.data);
      bookingsArray.push({
        id: index,
        title: ` Servicio: ${serviceName[index]} ,Empleado/a: ${employeeName[index]}`,
        startDate: new Date(data[0].data.data[0].startTime),
        endDate: new Date(data[0].data.data[0].endTime),
      });
    });
    setBookings(bookingsArray);
  };

  useEffect(() => {
    if (data[0].data && data[1].data && data[2].data) {
      bookingsTranslator();
    }
  }, [data[0].data, data[1].data, data[2].data]);

  //console.log("bookings", bookings);
  return <Calendar appointments={bookings} data={data} />;
};

export default Home;
