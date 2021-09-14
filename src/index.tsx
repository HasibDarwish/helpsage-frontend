import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from './app';
import reportWebVitals from './reportWebVitals';
import configureStore from "./store";
import { persistor } from './store'
import "./styles/shared.css"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={configureStore}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
