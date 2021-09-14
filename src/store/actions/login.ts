import {Dispatch} from "redux";
import {axiosAgent} from "../../api";
import {emptyProfile} from "./user";
import {emptyItems} from "./item";
import {emptyChats} from "./chat";
import {loader} from "./loader";

export const loginUser = () => {
	return {
		type: "LOGIN_USER",
		payload: true,
	};
};

const logout = () => {
	return {
		type: "LOGOUT_USER",
		payload: false,
	};
};

export const logoutMe = () => {
	return async (dispatch: Dispatch) => {
		dispatch(loader(true));
		try {
			await axiosAgent.get("logout");

			dispatch(emptyProfile());
			dispatch(emptyItems());
			dispatch(emptyChats());
			dispatch(logout());
			dispatch(loader(false));
		} catch (error) {
			console.log(error);
			dispatch(loader(false));
		}
	};
};
