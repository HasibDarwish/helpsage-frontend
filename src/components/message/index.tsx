import React, {Component} from "react";
import {Container} from "react-bootstrap";
import {ReduxState} from "../../store/@types";

import "./css/message.css";
import "./css/chatScope.css";
import ChatSec from "./chatSec";


interface MessageProps extends ReduxState {}

class Message extends Component<MessageProps, {}> {
	
	render() {
		return (
			<Container fluid className="p-0">
				<ChatSec />
			</Container>
		);
	}
}

export default (Message);
