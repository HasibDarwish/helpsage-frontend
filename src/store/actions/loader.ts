export const loader = (status: boolean) => {
	return {
		type: "LOADER_STATUS",
		payload: status,
	};
};
