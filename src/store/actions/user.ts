import {Dispatch} from "redux";
import {axiosAgent} from "../../api";
import {toBase64} from "../../library/helper";
import {getItems} from "./item";
import {ReduxState, User, Item} from "../@types";
import {loginUser} from "./login";
import {getChats} from "./chat";
import {loader} from "./loader";

export const getProfile = (user: User) => {
	return {
		type: "USER_PROFILE",
		payload: user,
	};
};

export const emptyProfile = () => {
	return {
		type: "EMPTY_PROFILE",
		payload: null,
	};
};

export const authenticateUser = (email: string, password: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const authenticateUser = await axiosAgent.get("login", {
				headers: {
					Authorization: `Basic ${toBase64(email, password)}`,
				},
			});
			const user: User = await authenticateUser.data;
			const chats = await user.chats;
			dispatch(getProfile(user));
			dispatch(getChats(chats));
			dispatch(loginUser());
			try {
				const requestItem = await axiosAgent.get("item");
				const items: Item[] = await requestItem.data;
				dispatch(getItems(items));
				dispatch(loader(false));
			} catch (error: any) {
				console.log({error: error.message});
				dispatch(loader(false));
			}
		} catch (error: any) {
			console.log({error: error.message});
			dispatch(loader(false));
		}
	};
};
export const loginWithThirdParty = () => {
	return async (dispatch: Dispatch) => {
		try {
			const authenticateUser = await axiosAgent.get("me");
			const user: User = await authenticateUser.data;
			const chats = await user.chats;
			dispatch(getProfile(user));
			dispatch(getChats(chats));
			dispatch(loginUser());
			try {
				const requestItem = await axiosAgent.get("item");
				const items: Item[] = await requestItem.data;
				dispatch(getItems(items));
				dispatch(loader(false));
			} catch (error: any) {
				console.log({error: error.message});
				dispatch(loader(false));
			}
		} catch (error: any) {
			console.log({error: error.message});
			dispatch(loader(false));
		}
	};
};

export const latestProfile = () => {
	return async (dispatch: Dispatch, getState: () => ReduxState) => {
		if (getState().login) {
			try {
				const requestProfile = await axiosAgent.get("me");
				const profile: User = await requestProfile.data;
				dispatch(getProfile(profile));
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("Unauthorized! you are not loged in");
		}
	};
};
