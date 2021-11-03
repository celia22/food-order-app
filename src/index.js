import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserAuthProvider from "./Context/UserAuthContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";
import ApiProvider from "./Context/apiProvider";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<UserAuthProvider>
			<QueryClientProvider client={queryClient}>
				<ApiProvider>
					<BrowserRouter>
						<App/>
					</BrowserRouter>
				</ApiProvider>
			</QueryClientProvider>
		</UserAuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
