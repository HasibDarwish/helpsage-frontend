
export interface UserType {
	username: string;
	firstName: string;
	email: string;
	password: string;
	image?: string;
	address?: AddressType;
	chats?: ChatTypes[];
	items?: ItemType[];
}

interface MessageType {
	_id: string;
	user: string;
	text: string;
}

interface ChatTypes {
	_id: string;
	name: string;
	participants: string[];
	item: string[];
	history: MessageType[];
}

export interface ItemType {
	_id: string;
	name: string;
	description: string;
	images: string;
	user: string;
	status: string;
}

interface AddressType {
	postcode: string | number;
	city: string;
	country: string;
}

