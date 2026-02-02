import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";

registerPlugin("create-block/data-store", {
	render: () => {
		return (
			<PluginSidebar
				name="meta-fields-sidebar"
				title={__("Post Options", "data-store")}
				icon="admin-settings"
			>
				Hello World
			</PluginSidebar>
		);
	},
});
