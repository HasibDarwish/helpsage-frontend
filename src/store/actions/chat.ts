import { Dispatch } from "redux";
import { axiosAgent } from "../../api";
import {Chat} from "../@types";

export const getChats = (chats: Chat[]) => {
	return {
		type: "GET_CHATS",
		payload: chats,
	};
};

export const emptyChats = () => {
	return {
		type: "EMPTY_CHATS",
		payload: null,
	};
};

export const latestChats = () => {
	return async (dispatch: Dispatch) => {
		try {
			const requestChats = await axiosAgent.get("chat/all");
			const chats = await requestChats.data;
			dispatch(getChats(chats));
		} catch (error: any) {
			console.log({error: error.message});
		}
	};
};