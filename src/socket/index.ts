import { io } from "socket.io-client"
const BASE_URL = process.env.REACT_APP_BASE_URL


export const socket = io(BASE_URL!, {
	transports: ["websocket"],
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd",
	},
});
// socket.on("message", (message) => {
//     console.log(message)
// })