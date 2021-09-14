import React, {ChangeEvent, Component, FormEvent} from "react";
import {Form} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {Container, Modal} from "react-bootstrap";
import {axiosAgent} from "../../api";
import Notification from "../alert";
import Address from "../login/registerFormElement";
import {ReduxState} from "../../store/@types";
import {connect} from "react-redux";
import "../../styles/shared.css";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {latestProfile} from "../../store/actions/user";

import {loader} from "../../store/actions/loader";
import { UserType } from "../login/@types";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

export interface UpdateProfileProps extends ReduxState {
	showModal: () => void;
	latestProfile: () => void;
	visible: boolean;
	setLoaderStatus: (status: boolean) => void;
}

export interface UpdateProfileState {
	user: UserType;
	notification: boolean;
	ReqSuccess: boolean | null;
}

class UpdateProfile extends Component<UpdateProfileProps, UpdateProfileState> {
	state = {
		user: {
			username: this.props.user?.username!,
			firstName: this.props.user?.firstName!,
			email: this.props.user?.email!,
			password: "",
			address: {
				postcode: this.props.user?.address?.postcode!,
				city: "",
				country: "",
			},
		},
		notification: false,
		ReqSuccess: null,
	};

	handleFormInputs = (event: ChangeEvent<HTMLInputElement>) => {
		const value: string | number = event.target.value;
		const id: string = event.target.id;
		this.setState({
			...this.state,
			user: {
				...this.state.user,
				[id]: value,
			},
		});
	};
	updateProfile = async (event: FormEvent) => {
		this.props.setLoaderStatus(true);
		event.preventDefault();
		try {
			const request = await axiosAgent.put("updateProfile", this.state.user);
			if (request.status === 200 || request.status === 201) {
				this.props.latestProfile();
				this.setState({ReqSuccess: true});
				this.setState({notification: true});
				this.props.showModal();
				setTimeout(() => {
					this.setState({ReqSuccess: null});
					this.setState({notification: false});
				}, 3000);
			}
			this.props.setLoaderStatus(false);
		} catch (error) {
			this.setState({ReqSuccess: false});
			this.setState({notification: true});
			this.props.showModal();

			setTimeout(() => {
				this.setState({ReqSuccess: null});
				this.setState({notification: false});
			}, 3000);
			this.props.setLoaderStatus(false);
		}
	};

	render() {
		return (
			<>
				{this.state.notification && (
					<Notification
						heading="Profile Update"
						message={
							this.state.ReqSuccess
								? "Your profile updated successfully!"
								: "Something went wrong"
						}
					/>
				)}

				<Modal
					show={this.props.visible}
					aria-labelledby="contained-modal-title-vcenter"
					className="animate__animated animate__fadeInRightBig"
				>
					<Modal.Header className="modalHeaderFooter">
						<div className="col">
							<h1 className="text-center">Update Profile</h1>
						</div>
					</Modal.Header>
					<Modal.Body className="show-grid">
						<Container fluid>
							<Form
								onSubmit={(event: FormEvent) => this.updateProfile(event)}
								className="modalBody"
							>
								<Row className="mb-3">
									<Form.Group as={Col} controlId="firstName">
										<Form.Label>First Name</Form.Label>
										<Form.Control
											value={this.state.user?.firstName}
											type="text"
											placeholder="first name"
											onChange={this.handleFormInputs}
										/>
									</Form.Group>

									<Form.Group as={Col} controlId="username">
										<Form.Label>Username</Form.Label>
										<Form.Control
											onChange={this.handleFormInputs}
											value={this.state.user?.username}
											type="text"
											placeholder="username"
										/>
									</Form.Group>
								</Row>
								<Row className="mb-3">
									<Form.Group as={Col} controlId="email">
										<Form.Label>Email</Form.Label>
										<Form.Control
											onChange={this.handleFormInputs}
											value={this.state.user?.email}
											type="email"
											placeholder="email"
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="postcode">
										<Form.Label>Postcode</Form.Label>
										<Form.Control
											onChange={(event: ChangeEvent<HTMLInputElement>) =>
												this.setState({
													...this.state,
													user: {
														...this.state.user,
														address: {
															...this.state.user.address,
															postcode: event.target.value,
														},
													},
												})
											}
											value={this.state.user?.address?.postcode}
											type="text"
											placeholder="postecode"
										/>
									</Form.Group>
								</Row>
								<Col className="d-flex flex-row justify-content-between">
									<Form.Label>Country</Form.Label>
									<Form.Label>City</Form.Label>
								</Col>
								<div className="col mb-3">
									<Address
										country={this.state.user.address.country}
										region={this.state.user.address.city}
										setCountry={(value: string) =>
											this.setState({
												...this.state,
												user: {
													...this.state.user,
													address: {
														...this.state.user.address,
														country: value,
													},
												},
											})
										}
										setCity={(value: string) =>
											this.setState({
												...this.state,
												user: {
													...this.state.user,
													address: {
														...this.state.user.address,
														city: value,
													},
												},
											})
										}
									/>
								</div>

								<Col className="d-flex flex-row justify-content-between">
									<button
										onClick={this.props.showModal}
										className="modalButtons w-50 me-2 p-2"
									>
										Cancel
									</button>
									<button
										onClick={(event: FormEvent) => this.updateProfile(event)}
										className="modalButtons w-50 ms-2 p-2"
									>
										Update Profile
									</button>
								</Col>
							</Form>
						</Container>
					</Modal.Body>
					<Modal.Footer className="modalHeaderFooter"></Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
