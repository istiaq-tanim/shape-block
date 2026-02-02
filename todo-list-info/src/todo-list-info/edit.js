import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { useSelect } from "@wordpress/data";
export default function Edit() {
	const data = useSelect((select) => {
		const store = select("create-block/todos");
		if (!store) return null;
		return {
			totalLength: store.getTodosLength(),
			doneLength: store.getDoneTodos(),
			undoneLength: store.getUndoneTodos(),
		};
	});

	return (
		<div {...useBlockProps()}>
			{data ? (
				<ul>
					<li>
						{__("Total Todo", "todo-list-info")} {data.totalLength}
					</li>
					<li>
						{__("Done Todo", "todo-list-info")}
						{data.doneLength}
					</li>
					<li>
						{__("Undone Todo", "todo-list-info")}
						{data.undoneLength}
					</li>
				</ul>
			) : (
				<p>{__("Todo List Info – hello from the editor!", "todo-list-info")}</p>
			)}
		</div>
	);
}
