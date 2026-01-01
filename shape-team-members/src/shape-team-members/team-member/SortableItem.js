import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={props.selectedLink === props.index ? "is-selected" : null}
		>
			<button
				onClick={() => props.setSelectedLink(props.index)}
				aria-label={__("Add Social Link", "shape-team-members")}
			>
				<Icon icon={props.icon} />
			</button>
		</li>
	);
}

export default SortableItem;
