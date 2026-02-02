import { dispatch } from "@wordpress/data";
import { POPULATE_TODOS, UPDATE_TODO } from "./types";
import { addTodoServer, toggleTodo as toggleTodoControl } from "./controls";

export const populateTodos = (todos) => {
	return {
		type: POPULATE_TODOS,
		todos,
	};
};

export function* addTodo(title) {
	try {
		const todo = yield addTodoServer(title);
		return {
			type: "ADD-TODO",
			todo,
		};
	} catch (error) {
		return dispatch("core/notices").createErrorNotice(
			error.message || "Could not create todo.",
		);
	}
}

export function* toggleTodo(todo, index) {
	try {
		const updatedTodo = yield toggleTodoControl(todo);
		return updateTodo(updatedTodo, index);
	} catch (error) {
		return dispatch("core/notices").createErrorNotice(
			error.message || "Could not create todo.",
		);
	}
}

export function updateTodo(todo, index) {
	return {
		type: UPDATE_TODO,
		index,
		todo,
	};
}

// export const fetchTodos = async ({ dispatch }) => {
// 	const response = await window.fetch(
// 		"https://jsonplaceholder.typicode.com/todos/?_limit=10",
// 	);
// 	const result = await response.json();
// 	dispatch(populateTodos(result));
// };
