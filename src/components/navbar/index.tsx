import React, {Component} from "react";
import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import {FaHome} from "react-icons/fa";
import {GiWorld} from "react-icons/gi";
import {TiMessages} from "react-icons/ti";
import {Action} from "redux";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Link} from "react-router-dom";

import ProfileImage from "./profile";
import {ReduxState} from "../../store/@types";
import {latestChats} from "../../store/actions/chat";
import {latestItems} from "../../store/actions/item";
import "./css/navbar.css";

const mapStateToProps = (state: ReduxState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<Action, any, any>) => ({
	latestChats: () => dispatch(latestChats()),
	latestItems: () => dispatch(latestItems()),
});


interface NavigationbarProps extends ReduxState {
	latestChats: () => void;
	latestItems: () => void;
}
interface NavigationbarState {
	windowSize: number | undefined;
}

class Navigationbar extends Component<NavigationbarProps, NavigationbarState> {
	state = {
		windowSize: window.innerWidth,
	};

	componentDidMount() {
		window.addEventListener("resize", () => {
			this.setState({windowSize: window.innerWidth});
		});
	}

	render() {
		return (
			<Navbar
				className="navBg my-0 py-0 border-0 position-sticky top-0 start-0"
				expand="sm"
			>
				<Container>
					<Link to="/" className="my-0 p-0">
						<FaHome size={60} title="Home" className="btn navIcons" />
					</Link>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						className=".navbar-toggler"
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						{this.state.windowSize >= 576 ? (
							<>
								<div className="me-auto"></div>
								<Nav>
									<Link to="/news-feed" className="ms-sm-5 my-0 py-0">
										<GiWorld
											onClick={() => this.props.latestItems()}
											size={60}
											title="News Feed"
											className=" btn navIcons"
										/>
									</Link>
									<Nav.Link href="/message" className="my-0 py-0">
										<TiMessages
											onClick={() => this.props.latestChats()}
											size={60}
											title="Message"
											className=" btn navIcons"
										/>
									</Nav.Link>

									<Nav.Link className="my-1 py-0">
										<ProfileImage />
									</Nav.Link>
								</Nav>
							</>
						) : (
							<>
								<Nav className="me-auto">
									<Row>
										<Col xs={4}>
											<Link to="/news_feed">
												<GiWorld
													onClick={() => this.props.latestItems()}
													size={60}
													title="News Feed"
													className=" btn navIcons"
												/>
											</Link>
										</Col>
										<Col xs={4}>
											<Nav.Link href="/message">
												<TiMessages
													onClick={() => this.props.latestChats()}
													size={60}
													title="Message"
													className=" btn navIcons"
												/>
											</Nav.Link>
										</Col>

										<Col xs={4}>
											<Nav.Link className="my-1 py-0">
												<ProfileImage />
											</Nav.Link>
										</Col>
									</Row>
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);
