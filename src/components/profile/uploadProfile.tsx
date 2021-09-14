import React, {ChangeEvent, Component, FormEvent} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {axiosAgent} from "../../api";
import Notification from "../alert";
import {ReduxState} from "../../store/@types";
import {latestProfile} from "../../store/actions/user";
import {loader} from "../../store/actions/loader";

import "../../styles/shared.css";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

export interface UploadProfileProps extends ReduxState {
	showModal: boolean;
	profileImageModal: () => void;
	latestProfile: () => void;
	setLoaderStatus: (status: boolean) => void;
}

export interface UploadProfileState {
	formData: any;
	profileImage: any;
	notification: boolean;
	ReqSuccess: boolean | null;
}

class UploadProfile extends Component<UploadProfileProps, UploadProfileState> {
	state = {
		profileImage: "",
		formData: {},
		notification: false,
		ReqSuccess: null,
	};

	showImageBeforeUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			this.setState({profileImage: reader.result});
		};
		reader.readAsDataURL((event.target.files as FileList)[0]);
	};

	handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
		this.showImageBeforeUpload(event);
		const file: File = (event.target.files as FileList)[0];
		let form_data = new FormData();
		form_data.append("profile", file);
		this.setState({formData: form_data});
	};

	uploadProfileImage = async (event: FormEvent) => {
		this.props.setLoaderStatus(true);
		event.preventDefault();
		try {
			const request = await axiosAgent.put(
				"uploadProfile",
				this.state.formData
			);
			if (request.status === 200 || request.status === 201) {
				this.props.latestProfile();
				this.setState({ReqSuccess: true});
				this.setState({notification: true});
				this.props.profileImageModal();
				setTimeout(() => {
					this.setState({ReqSuccess: null});
					this.setState({notification: false});
				}, 3000);
			}
			this.props.setLoaderStatus(false);
		} catch (error) {
			this.setState({ReqSuccess: false});
			this.setState({notification: true});
			this.props.profileImageModal();

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
								: "Something went wrong!"
						}
					/>
				)}
				<Modal
					show={this.props.showModal}
					className="animate__animated animate__rotateIn"
				>
					<Modal.Header className="modalHeaderFooter">
						<Col>
							<h1 className="text-center">Update Profile Picture</h1>
						</Col>
					</Modal.Header>
					<Modal.Body className="d-flex justify-content-center align-items-center flex-column">
						<Row>
							<Col xs="12" className="mx-auto mb-2">
								<img
									src={
										this.state.profileImage.length > 0
											? this.state.profileImage
											: this.props.user?.image
									}
									alt="profile"
									height="400"
									width="400"
									className="mx-auto"
									style={{borderRadius: "10px"}}
								/>
							</Col>
						</Row>

						<label className="w-50 m-1 modalButtons p-2">
							<input
								style={{
									opacity: "0",
									position: "absolute",
								}}
								type="file"
								id="file"
								name="file"
								className="mt-2"
								accept="image/jpeg, image/png"
								onChange={this.handleInputFile}
							/>
							<span>Select Profile</span>
						</label>
					</Modal.Body>
					<Modal.Footer className="modalHeaderFooter">
						<button
							className="modalButtons p-2"
							onClick={() => {
								this.setState({profileImage: ""});
								this.props.profileImageModal();
							}}
						>
							Cancel
						</button>
						<button
							className="modalButtons p-2"
							onClick={(event: FormEvent) => this.uploadProfileImage(event)}
						>
							Update Profile
						</button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfile);
