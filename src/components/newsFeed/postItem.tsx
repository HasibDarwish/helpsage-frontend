import React, {ChangeEvent, Component, FormEvent} from "react";
import {Form} from "react-bootstrap";
import {connect} from "react-redux";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {axiosAgent} from "../../api";
import {latestProfile} from "../../store/actions/user";
import {ReduxState} from "../../store/@types";
import Notification from "../alert";
import {PostItemType} from "./@Types";
import {loader} from "../../store/actions/loader";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface PostItemProps extends ReduxState {
	latestProfile: () => void;
	setLoaderStatus: (status: boolean) => void;
}

interface PostItemState {
	item: PostItemType;
	formData: {} | null;
	notification: boolean;
	ReqSuccess: boolean | null;
}

class ItemPost extends Component<PostItemProps, PostItemState> {
	state = {
		item: {
			description: "",
			user: this.props.user?._id!,
			status: "available",
		},
		formData: null,
		notification: false,
		ReqSuccess: null,
	};

	handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file: File = (event.target.files as FileList)[0];
		const file1: File = (event.target.files as FileList)[1];
		let form_data = new FormData();
		form_data.append("item", file);
		file1 && form_data.append("item", file1);
		form_data.append("item", JSON.stringify(this.state.item));

		this.setState({formData: form_data});
	};

	handleInputText = (event: ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({
			...this.state,
			item: {
				...this.state.item,
				description: event.target.value,
			},
		});
	};

	handlePostItem = async (event: FormEvent) => {
		event.preventDefault();
		this.props.setLoaderStatus(true);
		try {
			const request = await axiosAgent.post("item", this.state.formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (request.status === 200 || request.status === 201) {
				this.props.latestProfile();
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
		}

		(document.getElementById("description") as HTMLTextAreaElement).value = "";
		(document.getElementById("file") as HTMLInputElement).value = "";
	};

	render() {
		return (
			<Form onSubmit={(event: FormEvent) => this.handlePostItem(event)}>
				{this.state.notification && (
					<Notification
						heading="Post Item"
						message={
							this.state.ReqSuccess
								? "Your item posted successfully!"
								: "Something went wrong!"
						}
					/>
				)}
				<p>
					Please briefly describe the item you are willing to offer the
					community
				</p>
				<textarea
					onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
						this.handleInputText(event)
					}
					id="description"
					name="itemDescribtion"
					placeholder="Describe your item"
					className="textArea"
				></textarea>
				<div className="d-flex flex-row justify-content-between px-0">
					<label className="position-relative mt-3 btn postItemFormButtons">
						<input
							type="file"
							id="file"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								this.handleInputFile(event)
							}
							className="imageUploadBtn"
							multiple
						/>
						<span>Select Pictures</span>
					</label>

					<button
						type="submit"
						className="mt-3 btn postItemFormButtons"
						disabled={
							!this.state.item.description || this.state.formData === null
						}
					>
						Post
					</button>
				</div>
			</Form>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPost);
