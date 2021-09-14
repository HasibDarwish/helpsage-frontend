import React, {Component} from "react";
import { Alert } from "react-bootstrap";
import './css/alert.css'

interface AlertProps {
	heading: string;
	message: string;
}

export default class Notification extends Component<AlertProps, {}> {
	render() {
		return (
			<Alert show={true} className="notification">
                <Alert.Heading>{this.props.heading}!</Alert.Heading>
				<hr />
				<p>
					{this.props.message}
				</p>
				<hr />
			</Alert>
		);
	}
}
