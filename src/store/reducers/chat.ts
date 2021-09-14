import {AnyAction} from "redux";
import {reduxState} from "../index";

const chatReducer = (state = reduxState.chats, action: AnyAction) => {
	switch (action.type) {
		case "GET_CHATS":
			return action.payload;
		case "EMPTY_CHATS":
			return action.payload;
		default:
			return state;
	}
};

export default chatReducer;
