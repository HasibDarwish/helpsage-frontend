import React, {ChangeEvent, Component, FormEvent} from "react";
import {Container, Form, Modal, Row} from "react-bootstrap";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {axiosAgent} from "../../api";
import {latestProfile} from "../../store/actions/user";

import {ReduxState} from "../../store/@types";
import Notification from "../alert";
import { latestItems } from "../../store/actions/item";
import { loader } from "../../store/actions/loader";
import "animate.css"


const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	latestItems: () => dispatch(latestItems()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface UpdateItemProps extends ReduxState {
	showModal: boolean;
	setUpdateItemModal: () => void;
	latestProfile: () => void;
	latestItems: () => void;
	setLoaderStatus: (status: boolean) => void;
	id: string;
	description: string;
}

interface UpdateItemState {
	item: {
		description: string;
		user: string;
	};
	notification: boolean;
	ReqSuccess: boolean | null;
}

class UpdateItem extends Component<UpdateItemProps, UpdateItemState> {
	state = {
		item: {
			description: this.props.description!,
			user: this.props.user?._id!,
		},
		formData: null,
		notification: false,
		ReqSuccess: null,
	};

	handleUpdateItem = async (event: FormEvent) => {
		event.preventDefault();
		this.props.setLoaderStatus(true);
		try {
			const request = await axiosAgent.put(`item/${this.props.id}`, this.state.item);
			if (request.status === 200 || request.status === 201) {
				window.location.pathname === "/profile"
				? this.props.latestProfile()
				: this.props.latestItems();
				this.props.setUpdateItemModal();
				this.setState({ReqSuccess: true});
				this.setState({notification: true});
				setTimeout(() => {
					this.setState({ReqSuccess: null});
					this.setState({notification: false});
				}, 3000);
			}
			this.props.setLoaderStatus(false);
			
		} catch (error) {
			this.setState({ReqSuccess: false});
			this.setState({notification: true});
			
			setTimeout(() => {
				this.setState({ReqSuccess: null});
				this.setState({notification: false});
			}, 3000);
			this.props.setLoaderStatus(false);
		}
		
	};
	render() {
		return (
			<div>
				<Modal
					show={this.props.showModal}
					aria-labelledby="contained-modal-title-vcenter"
					centered
					className="modal-md animate__animated animate__backInDown"
				>
					<Modal.Header className="modalHeaderFooter">
						<div className="col">
							<h1 className="text-center">Update Item</h1>
						</div>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<Form
									onSubmit={(event: FormEvent) => this.handleUpdateItem(event)}
								>
									{this.state.notification && (
										<Notification
											heading="Update Item"
											message={
												this.state.ReqSuccess
													? "Your item updated successfully!"
													: "Something went wrong!"
											}
										/>
									)}

									<textarea
										onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
											this.setState({
												...this.state,
												item: {
													...this.state.item,
													description: event.target.value,
												},
											})
										}
										value={this.state.item.description}
										id="description"
										name="itemDescribtion"
										placeholder="update your item description"
										className="textArea"
									></textarea>
									<div className="d-flex flex-row justify-content-between px-0">
										<button
											onClick={() => this.props.setUpdateItemModal()}
											type="button"
											className="mt-3 btn postItemFormButtons"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="mt-3 btn postItemFormButtons"
											disabled={!this.state.item.description}
										>
											Update Item
										</button>
									</div>
								</Form>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer className="modalHeaderFooter"></Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);
