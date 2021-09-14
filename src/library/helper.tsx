import {
	differenceInCalendarDays,
	differenceInMinutes,
	differenceInHours,
} from "date-fns";
export const toBase64 = (email: string, password: string) => {
	return new Buffer([email, password].join(":")).toString("base64");
};
  

export const postedTime = (date:string, now:Date) => {
	const createdDate = new Date(date);
	const day = differenceInCalendarDays(now, createdDate);
	const hour = differenceInHours(now, createdDate);
	const minute = differenceInMinutes(now, createdDate);
	if (day !== 0) {
		return day + " d ago";
	} else if (hour !== 0) {
		return differenceInHours(now, createdDate) + " h ago";
	} else if (minute !== 0) {
		return differenceInMinutes(now, createdDate) + " min ago";
	} else {
		return "Now";
	}
};


	// const sortedItems = items.sort(
	// 	(a: Item, b: Item) =>
	// 		new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
	// );
