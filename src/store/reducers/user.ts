import {AnyAction} from "redux";
import {reduxState} from "../index";

const userReducer = (state = reduxState.user, action: AnyAction) => {
	switch (action.type) {
		case "USER_PROFILE":
			return action.payload;
		case "EMPTY_PROFILE":
			return action.payload;
		default:
			return state;
	}
};

export default userReducer;
