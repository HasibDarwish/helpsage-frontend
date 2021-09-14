import React, {Component} from "react";
import {connect} from "react-redux";
import {socket} from "../../socket";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
	MessageSeparator,
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	ConversationHeader,
	Avatar,
	ConversationList,
	Conversation,
} from "@chatscope/chat-ui-kit-react";

import "./css/chatScope.css";
import {latestChats} from "../../store/actions/chat";
import {postedTime} from "../../library/helper";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
	latestChats: () => dispatch(latestChats()),
});

class ChatSec extends Component {
	state = {
		chatId: null,
		message: {
			user: this.props.user._id,
			text: "",
		},
		activeClass: "activechat",
	};

	componentDidMount() {
		socket.on("connect", () => {
			console.log(socket.id);
			this.props.user?.chats.map((chat) => socket.emit("joinRoom", chat._id));
		});
		socket.on("message", async (msg) => {
			console.log(msg)
			await this.props.latestChats();
		});
		socket.on("typing", (user) => {
			this.setState({typingUser: user});
		});
	}

	render() {
		return (
			<div className="d-flex flex-row justify-content-between">
				<div className="col d-flex flex-column flex-grow-0 sideBar m-2 bg-white">
					<div className="d-flex flex-column sideBarDiv">
						<div className="d-flex flex-row pb-5 sideBarProfileSec position-sticky top-0 start-0 p-2">
							<img
								className="pe-2 me-3 sideBarProfileImage"
								src={this.props.user.image}
								alt="profile"
							/>
							<div className="d-flex flex-column sideBarWidth">
								<span>{this.props.user.username}</span>
								<span>{this.props.user.address.country}</span>
							</div>
						</div>

						<div className=" mb-1">
							<ConversationList>
								{this.props.chats?.map((chat) =>
									chat.participants
										?.filter((user) => user._id !== this.props.user._id)
										.map((chatUser) => (
											<Conversation
												key={chat._id}
												onClick={() => {
													this.setState({
														...this.state,
														chatId: chat._id,
													});
												}}
												className={`m-1 userListMessage ${
													this.state.chatId === chat._id
														? this.state.activeClass
														: ""
												}`}
												name={chatUser.username}
												info={
													chat.history[chat.history.length - 1].text.length > 15
														? chat.history[chat.history.length - 1].text.slice(
																0,
																15
														  ) + "..."
														: chat.history[chat.history.length - 1].text
												}
											>
												<Avatar src={chatUser.image} name={chatUser.username} />
											</Conversation>
										))
								)}
							</ConversationList>
						</div>
					</div>
				</div>
				<div className="col flex-fill px-0 ">
					<div className="col-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-0 p-2 pb-0">
						<div className="inputMessageSec">
							<MainContainer>
								<ChatContainer>
									{this.state.chatId &&
										this.props.chats.find(
											(chat) => chat._id === this.state.chatId
										).history.length > 0 && (
											<ConversationHeader>
												<Avatar
													src={
														this.props.chats.find(
															(chat) => chat._id === this.state.chatId
														).history[0].user.image
													}
													name={
														this.props.chats.find(
															(chat) => chat._id === this.state.chatId
														).history[0].user.username
													}
												/>
												<ConversationHeader.Content
													userName={
														this.props.chats.find(
															(chat) => chat._id === this.state.chatId
														).history[0].user.username
													}
												/>
											</ConversationHeader>
										)}

									<MessageList>
										<MessageSeparator content={new Date().toString()} />
										{this.state.chatId &&
											this.props.chats
												.find((chat) => chat._id === this.state.chatId)
												.history?.map((msg) =>
													msg.user._id === this.props.user._id ? (
														<>
															{msg.image.length > 0 && (
																<Message
																	key={msg._id}
																	model={{
																		message: msg.text,
																		sentTime: msg.createdAt,
																		direction: "outgoing",
																		position: "single",
																		payload: (
																			<Message.CustomContent
																				key={msg._id + msg.text}
																			>
																				<img
																					src={msg.image[0]}
																					className="messageImage"
																					alt="message"
																				/>

																				<p>{msg.text ? msg.text : ""}</p>
																				<Message.Footer
																					sentTime={postedTime(
																						msg.createdAt,
																						new Date()
																					)}
																				/>
																			</Message.CustomContent>
																		),
																	}}
																></Message>
															)}
															{msg.image.length === 0 && (
																<Message
																	key={msg._id}
																	model={{
																		message: msg.text,
																		sentTime: msg.createdAt,
																		direction: "outgoing",
																		position: "single",
																	}}
																>
																	<Message.Footer
																		sentTime={postedTime(
																			msg.createdAt,
																			new Date()
																		)}
																	/>
																</Message>
															)}
														</>
													) : (
														<>
															{msg.image.length > 0 && (
																<Message
																	key={msg._id}
																	model={{
																		message: msg.text,
																		sentTime: msg.createdAt,
																		sender: msg.user.username,
																		direction: "incoming",
																		position: "single",
																		payload: (
																			<Message.CustomContent
																				key={msg._id + msg.text}
																			>
																				<img
																					src={msg.image[0]}
																					className="messageImage"
																					alt="message"
																				/>

																				<p>{msg.text ? msg.text : ""}</p>
																				<Message.Footer
																					sentTime={postedTime(
																						msg.createdAt,
																						new Date()
																					)}
																				/>
																			</Message.CustomContent>
																		),
																	}}
																>
																	<Avatar
																		src={msg.user.image}
																		name={msg.user.username}
																	/>

																	<Message.Footer
																		sentTime={postedTime(
																			msg.createdAt,
																			new Date()
																		)}
																	/>
																</Message>
															)}
															{msg.image.length === 0 && (
																<Message
																	key={msg._id}
																	model={{
																		message: msg.text,
																		sentTime: msg.createdAt,
																		sender: msg.user.username,
																		direction: "incoming",
																		position: "single",
																	}}
																>
																	<Avatar
																		src={msg.user.image}
																		name={msg.user.username}
																	/>

																	<Message.Footer
																		sentTime={postedTime(
																			msg.createdAt,
																			new Date()
																		)}
																	/>
																</Message>
															)}
														</>
													)
												)}
									</MessageList>
									<MessageInput
										onSend={() =>
											socket.emit("message", {
												roomId: this.state.chatId,
												message: this.state.message,
											})
										}
										onChange={(event) => {
											this.setState({
												...this.state,
												message: {
													...this.state.message,
													text: event,
												},
											});
										}}
										placeholder="Type your message here"
									/>
								</ChatContainer>
							</MainContainer>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSec);
