import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import PersonalInfoSec from "./personalInfoSec";
import ItemPostSec from "../newsFeed/postItem";
import SingleItem from "../newsFeed/singleItem";
import {connect} from "react-redux";
import {socket} from "../../socket";

import {ReduxState} from "../../store/@types";
import Loader from "../loader";

import "./css/profile.css";

const mapStateToProps = (state: ReduxState) => state;

interface ProfileProps extends ReduxState {}

interface ProfileState {
	generateChatModal: boolean;
}

class Profile extends Component<ProfileProps, ProfileState> {
	state = {
		generateChatModal: false,
	};
	render() {
		return (
			<Container fluid>
				{this.props.loader && <Loader />}

				<Row className="p-3">
					<Col sm={5} md={4} lg={3} className="me-auto h-75 mb-4">
						<Row className="p-4 cardShadow cards">
							<PersonalInfoSec />
						</Row>
					</Col>
					<Col sm={6} md={7} lg={8} className="mx-auto h-25 ">
						<Row className="p-4 cardShadow mb-4 cards">
							<ItemPostSec />
						</Row>
						{this.props.user &&
							this.props.user.items.length > 0 &&
							this.props.user.items.reverse().map((item) => (
								<Row key={item._id} className="mb-3 p-3 cardShadow cards">
									<SingleItem item={item} />
								</Row>
							))}
					</Col>
				</Row>
			</Container>
		);
	}
}
export default connect(mapStateToProps)(Profile);
