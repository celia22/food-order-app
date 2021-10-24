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
    /*********** loop each booking and compares with employees id array ********/
    let employeeName = [];
    data[0].data.data.map((item) => {
      data[2].data.data.map((x) => {
        if (item.employee.includes(x._id)) {
          employeeName.push(x.firstName + " " + x.lastName);
        }
      });
    });

    /*********** loop each booking and compares with service id array ********/
    let serviceName = [];

    data[0].data.data.map((item) => {
      data[1].data.data.map((x) => {
        if (item.service.includes(x._id)) {
          serviceName.push(x.name);
        }
      });
    });

    const activeBookings = data[0].data.data.filter((x) => x.active);
    console.log("active?", activeBookings);

    activeBookings.map((item, index) => {
      bookingsArray.push({
        id: index,
        title: ` Servicio: ${serviceName[index]} ,Empleado/a: ${employeeName[index]}`,
        startDate: activeBookings[index].startTime,
        endDate: activeBookings[index].endTime,
        _id: activeBookings[index]._id,
      });
    });
    setBookings(bookingsArray);
    console.log("bookings", data[0].data.data);
  };

  useEffect(() => {
    if (data[0].data && data[1].data && data[2].data) {
      bookingsTranslator();
    }
  }, [data[0].data, data[1].data, data[2].data]);

  console.log("bokkings", bookings);

  return <Calendar appointments={bookings} data={data} />;
};

export default Home;
