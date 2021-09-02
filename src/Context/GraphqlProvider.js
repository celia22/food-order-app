import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { getCenterByEmail } from "../Graphql/queries";
import firebase from "firebase";

export const context = React.createContext();

const GraphqlProvider = (props) => {

	const [currentUserEmail, setCurrentUserEmail] = useState("");

	const { loading, error, data, refetch } = useQuery(
		getCenterByEmail,
		{
			variables: { email: currentUserEmail },
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
		<context.Provider value={{ loading, error, data, refetch }} >
			{ props.children }
		</context.Provider>
	)
};

export default GraphqlProvider;