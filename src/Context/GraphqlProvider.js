import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { getCenter } from "../Graphql/queries";
import firebase from "firebase";

export const graphqlContext = React.createContext();

const GraphqlProvider = (props) => {

	const [currentUserEmail, setCurrentUserEmail] = useState("");

	const { loading, error, data, refetch } = useQuery(
		getCenter,
		{
			variables: { id: "611cd6d5d8835ed2dcc5d392" },
			fetchPolicy: "network-only",
			nextFetchPolicy: "cache-and-network",
			pollInterval: 60000, // fetches every 60 seconds
			skip: !currentUserEmail // skips the query if user hasn't logged in and currentUserEmail === ""
		});

	firebase.auth().onAuthStateChanged(user => {
		if (user) setCurrentUserEmail(user.email)
	})

	useEffect(() => {
		if (currentUserEmail) refetch();
	}, [currentUserEmail, refetch])

	return (
		<graphqlContext.Provider value={{ loading, error, data, refetch }} >
			{ props.children }
		</graphqlContext.Provider>
	)
};

export default GraphqlProvider;