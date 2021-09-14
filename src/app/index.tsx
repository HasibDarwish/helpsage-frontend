import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navigationbar from "../components/navbar";
import Profile from "../components/profile";
import Login from "../components/login";
import {ReduxState} from "../store/@types";
import {connect} from "react-redux";
import NewsFeedProps from "../components/newsFeed";
import Message from "../components/message";

const mapStateToProps = (state: ReduxState) => state;

interface AppState {
	login: boolean;
}
class App extends Component<ReduxState, AppState> {
	state = {
		login: false,
	};
	render() {
		return (
			<Router>
					{!this.props.user && (
						<>
							<Route path="/" component={Login} exact />
							<Route path="/login" component={Login} exact />
						</>
					)}
					{this.props.login && this.props.user && <Navigationbar />}
					{this.props.login && this.props.user && (
						<>
							<Route path="/" component={NewsFeedProps} exact />
							<Route path="/profile" component={Profile} exact />
							<Route path="/message" component={Message} exact />
							<Route path="/news-feed" component={NewsFeedProps} exact />
						</>
					)}
			</Router>
		);
	}
}
export default connect(mapStateToProps)(App);
