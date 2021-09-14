import React, {ChangeEvent, FormEvent, Component} from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Address from "./registerFormElement";
import {UserType} from "./@types";
import {Post} from "../../api";
import Notification from "../alert";

import Loader from "../loader";
import {loader} from "../../store/actions/loader";
import {ReduxState} from "../../store/@types";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import { connect } from "react-redux";
import "animate.css";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface RegisterProps extends ReduxState {
	display: boolean;
	setRegister: () => void;
	setLoaderStatus: (status: boolean) => void;
}

interface RegisterState {
	user: UserType;
	notification: boolean;
}

class Register extends Component<RegisterProps, RegisterState> {
	state = {
		user: {
			username: "",
			firstName: "",
			email: "",
			password: "",
			address: {
				postcode: "",
				city: "",
				country: "",
			},
			chats: [],
			items: [],
			refreshToken: "",
		},
		notification: false,
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
	registerUser = async (event: FormEvent) => {
		this.props.setLoaderStatus(true);
		event.preventDefault();
		try {
			const request: any = await Post("register", this.state.user);
			console.log(request);
			if (request.status === 200) {
				this.setState({notification: true});
				setTimeout(() => {
					this.setState({notification: false});
					this.props.setRegister();
				}, 1000);
			} else {
				this.setState({notification: true});
				setTimeout(() => {
					this.setState({notification: false});
					this.props.setRegister();
				});
			}

			this.props.setLoaderStatus(false);
		} catch (error) {
			this.props.setLoaderStatus(false);
		}
	};

	render() {
		return (
			<>
				{this.state.notification && (
					<Notification
						heading="Registeration"
						message="You are registered successfully!"
					/>
				)}
				{this.props.loader && <Loader />}
				<Modal
					show={this.props.display}
					aria-labelledby="example-modal-sizes-title-lg"
					centered
					animation={true}
					className="modalAnimation modal-md animate__animated animate__fadeInTopRight"
				>
					<Modal.Header className="modalHeaderFooter">
						<div className="col">
							<h1 className="text-center">Register</h1>
						</div>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Form onSubmit={(event: FormEvent) => this.registerUser(event)}>
								<Row className="mb-3">
									<Form.Group as={Col} controlId="firstName">
										<Form.Label>First Name</Form.Label>
										<Form.Control
											onChange={this.handleFormInputs}
											type="text"
											placeholder="first name"
										/>
									</Form.Group>

									<Form.Group as={Col} controlId="username">
										<Form.Label>Username</Form.Label>
										<Form.Control
											onChange={this.handleFormInputs}
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
											type="email"
											placeholder="email"
										/>
									</Form.Group>

									<Form.Group as={Col} controlId="password">
										<Form.Label>Password</Form.Label>
										<Form.Control
											onChange={this.handleFormInputs}
											type="password"
											placeholder="Password"
										/>
									</Form.Group>
								</Row>
								<div className="col d-flex flex-row justify-content-between">
									<Form.Label>Country</Form.Label>
									<Form.Label>City</Form.Label>
								</div>
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
								<Row className="mb-3">
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
											type="text"
											placeholder="postecode"
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Check
											type="checkbox"
											label="I agree with your terms and conditions"
										/>
									</Form.Group>
								</Row>
								<div className="col d-flex flex-row justify-content-between">
									<button
										onClick={this.props.setRegister}
										className="btn modalButtons w-50 me-2  p-2"
									>
										Cancel
									</button>
									<button className="btn modalButtons w-50 ms-2 p-2">
										Register
									</button>
								</div>
							</Form>
						</Container>
					</Modal.Body>
					<Modal.Footer className="modalHeaderFooter"></Modal.Footer>
				</Modal>
			</>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
