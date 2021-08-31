import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserAuthProvider from "./Context/UserAuthContext";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "./Apollo/createApolloClient";
import { BrowserRouter } from "react-router-dom";
import GraphqlProvider from "./Context/GraphqlProvider";

ReactDOM.render(
    <React.StrictMode>
        <UserAuthProvider>
            <ApolloProvider  client={ apolloClient }>
                <GraphqlProvider >
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GraphqlProvider>
            </ApolloProvider>
        </UserAuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
