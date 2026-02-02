export const getTodos = (state) => {
	return state.items;
};

export const getTodosLength = (state) => {
	return state.items.length;
};
export const getDoneTodos = (state) => {
	return state.items.filter((item) => item.completed).length;
};
export const getUndoneTodos = (state) => {
	return state.items.filter((item) => !item.completed).length;
};
