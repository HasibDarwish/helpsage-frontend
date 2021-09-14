import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {ReduxState} from "../../store/@types";
import SingleItem from "./singleItem";
import Loader from "../loader";
import "./css/newsFeed.css";

const mapStateToProps = (state: ReduxState) => state;

interface NewsFeedProps extends ReduxState {}

class NewsFeed extends Component<NewsFeedProps> {
	render() {
		return (
			<Container>
				{this.props.loader && <Loader />}
				{this.props.items?.reverse().map((item) => (
					<Row key={item._id}>
						<div className="col-sm-11 col-md-9 col-ls-8 mx-auto my-3 p-3 cardShadow cards">
							<SingleItem item={item} />
						</div>
					</Row>
				))}
			</Container>
		);
	}
}

export default connect(mapStateToProps)(NewsFeed);
