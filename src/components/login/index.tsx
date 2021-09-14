import React, {Component} from "react";
import {Container} from "react-bootstrap";
import LoginForm from "./loginForm";
import Register from "./registerForm";
import {loginWithThirdParty} from "../../store/actions/user";
import {ReduxState} from "../../store/@types";
import {loader} from "../../store/actions/loader";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	loginWithThirdParty: () => dispatch(loginWithThirdParty()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});
interface LoginProps extends ReduxState, RouteComponentProps {
	loginWithThirdParty: () => void;
	setLoaderStatus: (status: boolean) => void;
}
interface LoginState {
	register: boolean;
}

class Login extends Component<LoginProps, LoginState> {
	state = {
		register: false,
	};

	componentDidMount = () => {
		window.addEventListener("DOMContentLoaded", () => {
			window.location.pathname === "/login" && this.props.setLoaderStatus(true);
			this.props.loginWithThirdParty();
			window.location.pathname === "/login" && this.props.history.push("/profile")
		});
	};

	render() {
		console.log(document.cookie);
		return (
			<Container>
				{this.state.register ? (
					<Register
						display={this.state.register}
						setRegister={() => this.setState({register: !this.state.register})}
					/>
				) : (
					<LoginForm
						register={() => this.setState({register: !this.state.register})}
					/>
				)}
			</Container>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
