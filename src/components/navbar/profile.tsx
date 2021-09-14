import React, {Component} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {ReduxState} from "../../store/@types";
import UpdateProfile from "../profile/updateProfile";
import {latestProfile} from "../../store/actions/user";
import { logoutMe } from "../../store/actions/login";


const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	logoutMe: () => dispatch(logoutMe()),
});

interface ProfileProps extends ReduxState {
	latestProfile: () => void;
	logoutMe: () => void;
}

interface ProfileState {
	visible: boolean;
}
class Profile extends Component<ProfileProps, ProfileState> {
	state = {
		visible: false,
	};
	

	render() {
		return (
			<>

				<DropdownButton
					key="start"
					id="start"
					drop="start"
					variant="light"
					menuVariant="light"
					title={
						<img
							src={this.props.user?.image}
							alt="profile"
							className="profileImageNav"
						/>
					}
				>
					<Dropdown.Item
						as={Link}
						to="/profile"
						onClick={() => this.props.latestProfile()}
					>
						<img
							src={this.props.user?.image}
							alt="profile"
							className="profileImageNav me-2"
						/>
						<span>Profile</span>
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => this.setState({visible: !this.state.visible})}
					>
						Edit Profile
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item as={Link} to="/" onClick={() => this.props.logoutMe()}>
						Logout
					</Dropdown.Item>
				</DropdownButton>
				<UpdateProfile
					showModal={() => this.setState({visible: !this.state.visible})}
					visible={this.state.visible}
				/>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
