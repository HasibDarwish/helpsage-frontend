import React, {Component, FormEvent, ChangeEvent} from "react";
import {Container, Modal, Row, Form} from "react-bootstrap";

import {FcGoogle} from "react-icons/fc";
import {VscGithub} from "react-icons/vsc";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {withRouter, RouteComponentProps} from "react-router-dom";

import {authenticateUser} from "../../store/actions/user";
import {loader} from "../../store/actions/loader";
import {ReduxState} from "../../store/@types";
import {axiosAgent} from "../../api";
import Loader from "../loader";
import "animate.css";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	authenticateUser: (email: string, password: string) =>
		dispatch(authenticateUser(email, password)),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface LoginFormProps extends ReduxState, RouteComponentProps {
	authenticateUser: (email: string, password: string) => void;
	register: () => void;
	setLoaderStatus: (status: boolean) => void;
}
interface loginFormState {
	email: string;
	password: string;
}

class LoginForm extends Component<LoginFormProps, loginFormState> {
	state = {
		email: "",
		password: "",
	};

	handleLoginInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const id = event.target.id;
		this.setState({...this.state, [id]: value});
	};

	loginUser = async (event: FormEvent) => {
		this.props.setLoaderStatus(true);
		event.preventDefault();
		this.props.authenticateUser(this.state.email, this.state.password);

		window.location.pathname === "/" && this.props.history.push("/profile");
		(document.getElementById("email") as HTMLInputElement).value = "";
		(document.getElementById("password") as HTMLInputElement).value = "";
	};
	render() {
		return (
			<>
				{this.props.loader && <Loader />}

				<Modal
					show={true}
					aria-labelledby="contained-modal-title-vcenter"
					centered
					className="modal-md animate__animated animate__fadeInTopLeft"
				>
					<Modal.Header className="modalHeaderFooter">
						<div className="col">
							<h1 className="text-center">Login in with</h1>
						</div>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<div className="col mx-1 mb-1 mb-sm-0 btn loginIcons">
									<a href="https://helpsage.herokuapp.com/googlelogin">
										<FcGoogle
											size={60}
											onClick={() =>
												axiosAgent
													.get("me")
													.then((response) => console.log(response))
											}
										/>
									</a>
								</div>
								<div className="col mx-1 mb-1 mb-sm-0 btn  loginIcons">
									<a href="https://helpsage.herokuapp.com/githublogin">
										<VscGithub size={60} />
									</a>
								</div>
							</Row>
							<hr />
							<p>or with your email</p>

							<Row>
								<Form onSubmit={(event: FormEvent) => this.loginUser(event)}>
									<Form.Group as={Row} className="mb-3" controlId="email">
										<div className="col">
											<Form.Control
												onChange={(event: ChangeEvent<HTMLInputElement>) =>
													this.handleLoginInput(event)
												}
												type="email"
												size="lg"
												placeholder="email@example.com"
												required
											/>
										</div>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" controlId="password">
										<div className="col">
											<Form.Control
												onChange={(event: ChangeEvent<HTMLInputElement>) =>
													this.handleLoginInput(event)
												}
												type="password"
												size="lg"
												placeholder="***********"
												required
											/>
										</div>
										<a href="/">Forgot password</a>
									</Form.Group>
									<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
										<div className="col-12 col-sm-5">
											<button
												className="w-100 btn modalButtons p-2"
												type="submit"
											>
												Login
											</button>
										</div>
										<div className="col text-center">OR</div>
										<div className="col-12 col-sm-5">
											<button
												onClick={() => this.props.register()}
												className="w-100 modalButtons p-2"
											>
												Register
											</button>
										</div>
									</div>
								</Form>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer className="modalHeaderFooter"></Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
