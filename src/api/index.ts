import axios from "axios";

export const axiosAgent = axios.create();

axiosAgent.defaults.baseURL = process.env.REACT_APP_CLOUD_URL;
// axiosAgent.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axiosAgent.defaults.withCredentials = true;
axiosAgent.defaults.headers = {
	"Content-Type": "application/json",
	
};

export const Get = (param: string, options = {}) =>
	axiosAgent.get(`/${param}`, options).then((response) => response);
export const Post = (param: string, payload: any) =>
	axiosAgent.post(`/${param}`, payload).then((response) => response);

export const Put = (param: string, payload: any, options = {}) =>
	axiosAgent
		.put(`/${param}`, payload, options)
		.then((response) => response)
		.catch((error) => error);

export const DeleteReq = (param: string) =>
	axiosAgent.delete(`/${param}`).then((response) => response);

