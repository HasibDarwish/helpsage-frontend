import { Dispatch } from "redux";
import { axiosAgent } from "../../api";
import { Item, ReduxState } from "../@types";

export const getItems = (items: Item[]) => {
	return {
		type: "GET_ITEMS",
		payload: items,
	};
};

export const emptyItems = () => {
	return {
		type: "EMPTY_ITEMS",
		payload: null,
	};
};




export const latestItems = () => {
	return async (dispatch: Dispatch, getState: () => ReduxState) => {
		if (getState().login) {
			try {
				const requestItems = await axiosAgent.get("item");
				const items = await requestItems.data;
				dispatch(getItems(items));
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("Unauthorized! you are not loged in");
		}
	};
};
