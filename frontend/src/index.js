import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./state/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store} >
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
