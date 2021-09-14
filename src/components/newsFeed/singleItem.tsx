import React, {Component} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {RiShareForwardBoxLine} from "react-icons/ri";
import {FaHandsHelping} from "react-icons/fa";
import {BiDotsVertical} from "react-icons/bi";
import copy from "copy-to-clipboard";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

import {ReduxState, Item} from "../../store/@types";
import {postedTime} from "../../library/helper";
import {axiosAgent} from "../../api";
import UpdateItem from "./updateItem";
import GenerateChat from "./generateChat";
import {latestProfile} from "../../store/actions/user";
import {latestItems} from "../../store/actions/item";
import {loader} from "../../store/actions/loader";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestProfile: () => dispatch(latestProfile()),
	latestItems: () => dispatch(latestItems()),
	setLoaderStatus: (status: boolean) => dispatch(loader(status)),
});

interface SingleItemProps extends ReduxState {
	item: Item;
	latestProfile: () => void;
	latestItems: () => void;
	setLoaderStatus: (status: boolean) => void;
}

interface SingleItemState {
	updateItemModal: boolean;
	generateChatModal: boolean;
}

class SingleItem extends Component<SingleItemProps, SingleItemState> {
	state = {
		updateItemModal: false,
		generateChatModal: false,
	};

	handleItemDeletion = async () => {
		this.props.setLoaderStatus(true);
		try {
			const request = await axiosAgent.delete(`item/${this.props.item._id}`);
			if (request.status === 200 || request.status === 201) {
				window.location.pathname === "/profile"
					? this.props.latestProfile()
					: this.props.latestItems();
			}

			this.props.setLoaderStatus(false);
		} catch (error) {
			console.log(error);
			this.props.setLoaderStatus(false);
		}
	};

	handleItemGone = async () => {
		this.props.setLoaderStatus(true);
		try {
			const request = await axiosAgent.put(`item/${this.props.item._id}`, {
				status: "gone",
				user: this.props.user?._id,
			});
			if (request.status === 200 || request.status === 201) {
				window.location.pathname === "/profile"
					? this.props.latestProfile()
					: this.props.latestItems();
			}
			this.props.setLoaderStatus(false);
		} catch (error) {
			console.log(error);
			this.props.setLoaderStatus(false);
		}
	};

	render() {
		return (
			<>
				<UpdateItem
					id={this.props.item._id}
					description={this.props.item.description}
					showModal={this.state.updateItemModal}
					setUpdateItemModal={() =>
						this.setState({updateItemModal: !this.state.updateItemModal})
					}
				/>
				<GenerateChat
					showModal={this.state.generateChatModal}
					setChatModal={() =>
						this.setState({generateChatModal: !this.state.generateChatModal})
					}
					item={this.props.item}
				/>
				<Col
					xs={12}
					className="d-flex flex-row justify-content-between align-items-center mb-2"
				>
					<div className="d-flex flex-row align-items-center">
						<img
							src={this.props.item.user.image}
							alt="profile"
							className="postOwnerProfileImg me-2"
						/>
						<strong>{this.props.item.user.username}</strong>
					</div>
					<div className="position-relative">
						<span className="me-5">
							{postedTime(this.props.item.createdAt.toString(), new Date())}
						</span>
						<DropdownButton
							id="threeDots"
							variant="dark"
							menuVariant="light"
							drop="start"
							title={<BiDotsVertical size={25} />}
							className="mt-2 d-inline"
						>
							<Dropdown.Item
								href="#/action-1"
								active
								disabled
								className="options"
							>
								Options
							</Dropdown.Item>
							{this.props.user?._id === this.props.item.user._id ? (
								<>
									<Dropdown.Item
										onClick={() =>
											this.setState({
												updateItemModal: !this.state.updateItemModal,
											})
										}
									>
										Edit Post
									</Dropdown.Item>
									<Dropdown.Item onClick={this.handleItemDeletion}>
										Delete Post
									</Dropdown.Item>
									<Dropdown.Item onClick={this.handleItemGone}>
										Item Gone
									</Dropdown.Item>
								</>
							) : (
								<>
									<Dropdown.Item disabled>Edit Post</Dropdown.Item>
									<Dropdown.Item disabled>Delete Post</Dropdown.Item>
									<Dropdown.Item disabled>Item Gone</Dropdown.Item>
								</>
							)}
						</DropdownButton>
					</div>
				</Col>
				<hr />
				<p>{this.props.item.description}</p>

				<Row className="mb-3 p-0 m-0">
					{this.props.item.images.length === 1 && (
						<Col xs={12}>
							<img
								src={this.props.item.images[0]}
								alt="item"
								className="pb-2 img-fluid"
							/>
						</Col>
					)}

					{this.props.item.images.length === 2 && (
						<>
							<Col xs={6}>
								<img
									src={this.props.item.images[0]}
									alt="item"
									className="pb-2 img-fluid"
								/>
							</Col>
							<Col xs={6}>
								<img
									src={this.props.item.images[1]}
									alt="item"
									className="pb-2 img-fluid"
								/>
							</Col>
						</>
					)}
				</Row>
				<hr />
				<Col className="d-flex flex-row">
					{this.props.item.user._id !== this.props.user?._id! ? (
						<button
							onClick={() =>
								this.setState({
									generateChatModal: !this.state.generateChatModal,
								})
							}
							className="btn me-2 itemBtn"
						>
							<span className="p-2">Needit</span>
							<FaHandsHelping size={25} />
						</button>
					) : (
						<button className="btn me-2 itemBtn" disabled>
							<span className="p-2">Needit</span>
							<FaHandsHelping size={25} />
						</button>
					)}

					<button
						onClick={() =>
							copy(`${window.location.href}/${this.props.item._id}`)
						}
						className="btn itemBtn"
					>
						<span className="p-2">Share</span>
						<RiShareForwardBoxLine size={25} />
					</button>
				</Col>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
