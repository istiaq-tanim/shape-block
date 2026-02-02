import { ADD_TODO, POPULATE_TODOS, UPDATE_TODO } from "./types";

const DEFAULT_STATE = {
	items: [],
};
const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ADD_TODO:
			return { ...state, items: [...state.items, action.todo] };
		case POPULATE_TODOS:
			return { ...state, items: action.todos };
		case UPDATE_TODO: {
			const updatedTodo = state.items.map((item) => {
				if (item.id === action.todo.id) {
					return (item = action.todo);
				} else {
					return item;
				}
			});
			return { ...state, items: updatedTodo };
		}
		default:
			return state;
	}
};

export default reducer;
