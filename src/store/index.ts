import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";

import {persistStore} from "redux-persist";
import {persistReducer} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

import userReducer from "./reducers/user";
import {ReduxState} from "./@types";
import itemReducer from "./reducers/item";
import chatReducer from "./reducers/chat";
import loginReducer from "./reducers/login";
import loaderReducer from "./reducers/loader";

export const reduxState: ReduxState = {
	user: null,
	login: false,
	items: null,
	chats: null,
	loader: false,
};

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	items: itemReducer,
	chats: chatReducer,
	loader: loaderReducer,
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	key: "root",
	storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = createStore<any, any, any, any>(
	persistedReducer,
	reduxState,
	composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(configureStore);
export default configureStore;
