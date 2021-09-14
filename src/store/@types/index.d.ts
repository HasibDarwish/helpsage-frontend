export interface ReduxState {
	user: User | null;
	login: boolean;
	items: Item[] | null;
	chats: Chat[] | null;
	loader: boolean;
}


export interface User {
	_id: string;
	address: Address;
	image: string;
	chats: Chat[];
	items: Item[];
	username: string;
	firstName: string;
	email: string;
}

interface Address {
	city: string;
	country: string;
	postcode: string | number;
}

export interface Chat {
	_id: string;
	item: ChatItem;
	participants: UserShort[];
	history: Message[];
}

export interface Message {
	_id: string;
	user: UserShort;
	text: string;
	updatedAt: Date;
	createdAt: Date;
}


export interface ChatItem {
	_id: string;
	images: string[];
	status: string;
	description: string;
}

export interface Item {
	_id: string;
	images: string[];
	status: string;
	description: string;
	user: UserShort;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserShort {
	_id: string;
	image: string;
	username: string;
}
