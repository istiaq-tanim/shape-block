import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { useSelect, useDispatch } from "@wordpress/data";
import { CheckboxControl } from "@wordpress/components";
import { TextControl } from "@wordpress/components";
import { Button } from "@wordpress/components";
import { useState } from "@wordpress/element";
export default function Edit() {
	const todos = useSelect((select) => {
		const todosStore = select("create-block/todos");
		return todosStore && todosStore.getTodos();
	}, []);
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const actions = useDispatch("create-block/todos");

	const addTodo = actions && actions.addTodo;
	const toggleTodo = actions && actions.toggleTodo;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (addTodo && title) {
			setIsLoading(true);
			await addTodo(title);
			setTitle("");
			setIsLoading(false);
		}
	};
	return (
		<div {...useBlockProps()}>
			{!todos ? (
				<p>{__("Make sure your plugin is Activate", "todo-list")}</p>
			) : (
				<>
					<ul>
						{todos.map((todo, index) => (
							<li
								key={todo.id}
								className={todo?.completed ? "completed-todo" : ""}
							>
								<CheckboxControl
									label={todo.title}
									checked={todo.completed}
									onChange={() => {
										if (toggleTodo) {
											toggleTodo(todo, index);
										}
									}}
								></CheckboxControl>
							</li>
						))}
					</ul>
					<form onSubmit={(e) => handleSubmit(e)} className="todo-form">
						<TextControl
							value={title}
							onChange={(value) => setTitle(value)}
						></TextControl>
						<Button disabled={isLoading} type="submit" isPrimary>
							{__("Add Todo", "todo-list")}
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
