import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserAuthProvider from "./Context/UserAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import ApiProvider from "./Context/apiProvider";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <BrowserRouter>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </ApiProvider>
      </QueryClientProvider>
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
