import { dispatch } from "@wordpress/data";
import { populateTodos } from "./actions";
import { fetchTodos } from "./controls";

export function* getTodos(state) {
	try {
		const todos = yield fetchTodos();
		return populateTodos(todos);
	} catch (error) {
		return dispatch("core/notices").createErrorNotice(
			error.message || "Could not Fetch Todos",
		);
	}
}

// async function getTodos({ dispatch }) {
// 	const response = await window.fetch(
// 		"https://jsonplaceholder.typicode.com/todos/?_limit=10",
// 	);
// 	const result = await response.json();
// 	dispatch.populateTodos(result);
// }

// export const getTodos =
// 	() =>
// 	async ({ dispatch }) => {
// 		await dispatch(fetchTodos());
// 	};
