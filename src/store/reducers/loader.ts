import { AnyAction } from "redux";
import { reduxState } from "..";

const loaderReducer = (state = reduxState.loader, action: AnyAction) => {
	switch (action.type) {
		case "LOADER_STATUS":
			return action.payload;
		default:
			return state;
	}
};

export default loaderReducer;
