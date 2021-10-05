import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "../axios/axios";
import firebase from "firebase";

export const context = React.createContext();

const ApiProvider = (props) => {
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const { isLoading, error, data, refetch } = useQuery(
    ["CenterProfileData", currentUserEmail],
    () => axios.get(`/center/login/${currentUserEmail}`),
    {
      enabled: false,
    }
  );

  firebase.auth().onAuthStateChanged((user) => {
    if (user) setCurrentUserEmail(user.email);
  });

  useEffect(() => {
    if (currentUserEmail) refetch();
  }, [currentUserEmail, refetch]);

  return (
    <context.Provider value={{ isLoading, error, data, refetch }}>
      {props.children}
    </context.Provider>
  );
};

export default ApiProvider;
