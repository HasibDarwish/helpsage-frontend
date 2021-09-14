import {AnyAction} from "redux";
import {reduxState} from "../index";

const loginReducer = (state = reduxState.login, action: AnyAction) => {
	switch (action.type) {
		case "LOGIN_USER":
			return action.payload;
		case "LOGOUT_USER":
			return action.payload;
		default:
			return state;
	}
};

export default loginReducer;
