import React, {Component} from "react";
import {MdModeEdit} from "react-icons/md";
import {TiLocationOutline} from "react-icons/ti";
import {connect} from "react-redux";
import {ReduxState} from "../../store/@types";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {authenticateUser} from "../../store/actions/user";
import UploadProfile from "./uploadProfile";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	authUser: (email: string, password: string) =>
		dispatch(authenticateUser(email, password)),
});

interface PersonalInfoProps extends ReduxState {}

interface PersonalInfoState {
	imageModal: boolean;
}


class PersonalInfoSec extends Component<PersonalInfoProps, PersonalInfoState> {
	state = {
		imageModal: false,
	};
	render() {
		return (
			<>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<p className="profileHeading">My Profile</p>
					<img
						onClick={() => this.setState({imageModal: true})}
						src={this.props.user?.image}
						alt="profile"
						className="profileImage mb-4"
					/>
				</div>
				<hr />
				<UploadProfile
					showModal={this.state.imageModal}
					profileImageModal={() =>
						this.setState({imageModal: !this.state.imageModal})
					}
				/>

				<div>
					<MdModeEdit size={25} className="me-2" /> {this.props.user?.firstName}
				</div>
				<div>
					<TiLocationOutline size={25} className="me-2" />{" "}
					{this.props.user?.address?.city},{this.props.user?.address?.country}
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoSec);
