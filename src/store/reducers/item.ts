import {AnyAction} from "redux";
import {reduxState} from "../index";

const itemReducer = (state = reduxState.items, action: AnyAction) => {
	switch (action.type) {
		case "GET_ITEMS":
			return action.payload;
		case "EMPTY_ITEMS":
			return action.payload;
		default:
			return state;
	}
};

export default itemReducer;
