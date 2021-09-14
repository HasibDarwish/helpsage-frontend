import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {axiosAgent} from "../../api";
import Notification from "../alert";
import { withRouter } from "react-router-dom"
import {RouteComponentProps} from "react-router-dom"

import {ReduxState, Item} from "../../store/@types";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {latestProfile} from "../../store/actions/user";
import {latestChats} from "../../store/actions/chat";
import {loader} from "../../store/actions/loader";
import { socket } from "../../socket";
import "animate.css";


const mapStateToProps = (state: ReduxState) => state;
const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	latestChats: () => dispatch(latestChats()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface GenerateChatProps extends ReduxState, RouteComponentProps {
	latestProfile: () => void;
	latestChats: () => void;
	setChatModal: () => void;
	setLoaderStatus: (status: boolean) => void;
	showModal: boolean;
	item: Item;
}

interface GenerateChatState {
	newChat: {
		participants: string[];
		item: string;
		history: {user: string; text: string; image: string}[];
	};
	ReqSuccess: boolean | null;
	notification: boolean;
}


class GenerateChat extends Component<GenerateChatProps, GenerateChatState> {
	state = {
		newChat: {
			participants: [this.props.user?._id!, this.props.item.user._id!],
			item: this.props.item._id!,
			history: [
				{
					user: this.props.item.user._id!,
					text: this.props.item.description!,
					image: this.props.item.images[0]!,
				},
			],
		},
		ReqSuccess: null,
		notification: false,
	};
	handleGeneratingChat = async () => {
		this.props.setLoaderStatus(true)
		try {
			const request = await axiosAgent.post("chat", this.state.newChat);
			socket.emit("joinRoom", request.data._id)
			this.setState({ReqSuccess: true});
			this.setState({notification: true});
			this.props.setChatModal();
			this.props.latestChats();
			setTimeout(() => {
				this.props.history.push("/message")
				this.setState({ReqSuccess: null});
				this.setState({notification: false});
				this.props.setLoaderStatus(false)
			}, 500);
		} catch (error) {
			console.log(error);
			this.setState({ReqSuccess: false});
			this.setState({notification: true});
			this.props.setChatModal();
			
			setTimeout(() => {
				this.props.history.push("/message")
				this.setState({ReqSuccess: null});
				this.setState({notification: false});
				this.props.setLoaderStatus(false)
			}, 500);
		}
	};

	render() {
		return (
			<div>
				{this.state.notification && (
					<Notification
						heading="Contact User"
						message={
							this.state.ReqSuccess
								? "Your profile updated successfully!"
								: "Something went wrong!"
						}
					/>
				)}
				{this.props.item && (
					<Modal
						show={this.props.showModal}
						aria-labelledby="contained-modal-title-vcenter"
						centered
						className="modal-md animate__animated animate__fadeInUp "
					>
						<Modal.Header className="modalHeaderFooter">
							<div className="col">
								<h1 className="text-center">Message</h1>
							</div>
						</Modal.Header>
						<Modal.Body>
							<p>To contact the user regarding this item click on Proceed</p>
							<div className="d-flex flex-row justify-content-between px-0">
								<button
									type="button"
									className="mt-3 btn postItemFormButtons"
									onClick={() => this.props.setChatModal()}
								>
									Cancel
								</button>
								<button
									onClick={() => this.handleGeneratingChat()}
									className="mt-3 btn postItemFormButtons"
								>
									Proceed
								</button>
							</div>
						</Modal.Body>
						<Modal.Footer className="modalHeaderFooter"></Modal.Footer>
					</Modal>
				)}
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateChat))
