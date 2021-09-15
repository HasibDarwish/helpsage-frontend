import { io } from "socket.io-client"
const BASE_URL =
	process.env.REACT_APP_CLOUD_URL || "https://helpsage.herokuapp.com";


export const socket = io(BASE_URL!, {
	transports: ["websocket"],
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd",
	},
});